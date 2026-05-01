import { useRef, useState, useCallback } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useEditorStore from '../store/useEditorStore'
import InlineEditable from './InlineEditable'

// ─── Per-type Block Preview Renderers ───────────────────────────────────────

function HeaderBlock({ block, onEdit }) {
  const { content, style } = block
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, textAlign: style.textAlign || 'center' }}>
      {content.logoSrc ? (
        <img src={content.logoSrc} alt={content.logoText} style={{ maxHeight: 48, display: 'inline-block' }} />
      ) : (
        <InlineEditable
          as="span"
          blockId={block.id}
          fieldKey="logoText"
          html={content.logoText}
          onSave={(html) => onEdit({ logoText: html })}
          style={{
            color: style.color,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            fontWeight: style.fontWeight,
            letterSpacing: style.letterSpacing || '0px',
            display: 'inline-block',
            minWidth: '2em',
          }}
        />
      )}
    </div>
  )
}

function HeadingBlock({ block, onEdit }) {
  const { content, style } = block
  const Tag = content.level || 'h1'
  const fontSizeMap = { h1: '32px', h2: '26px', h3: '20px' }
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding }}>
      <InlineEditable
        as={Tag}
        blockId={block.id}
        fieldKey="text"
        html={content.text}
        onSave={(html) => onEdit({ text: html })}
        style={{
          margin: 0,
          color: style.color || '#111827',
          fontSize: style.fontSize || fontSizeMap[Tag] || '32px',
          fontFamily: style.fontFamily,
          fontWeight: style.fontWeight || 'bold',
          textAlign: style.textAlign || 'left',
          lineHeight: style.lineHeight || '1.2',
          minWidth: '2em',
        }}
      />
    </div>
  )
}

function FooterBlock({ block, onEdit }) {
  const { content, style } = block
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, textAlign: style.textAlign || 'center' }}>
      <InlineEditable
        as="p"
        blockId={block.id}
        fieldKey="text"
        html={content.text}
        onSave={(html) => onEdit({ text: html })}
        style={{
          margin: 0,
          color: style.color,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          lineHeight: style.lineHeight,
          minHeight: '1em',
        }}
      />
    </div>
  )
}

function HeroBlock({ block, onEdit }) {
  const { content, style } = block
  const hasBtn = content.showButton !== false && content.buttonText && content.buttonText.trim()
  const hasLink = content.buttonHref && content.buttonHref !== 'https://'
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, textAlign: style.textAlign || 'center' }}>
      {content.imageSrc && (
        <img src={content.imageSrc} alt="" style={{ display: 'block', width: '100%', marginBottom: 24 }} />
      )}
      <InlineEditable
        as="h1"
        blockId={block.id}
        fieldKey="title"
        html={content.title}
        onSave={(html) => onEdit({ title: html })}
        style={{
          margin: '0 0 14px 0',
          color: style.titleColor || '#ffffff',
          fontSize: style.titleFontSize,
          fontWeight: style.titleFontWeight,
          fontFamily: style.fontFamily,
          lineHeight: 1.25,
          textAlign: style.textAlign || 'center',
          minWidth: '2em',
        }}
      />
      <InlineEditable
        as="p"
        blockId={block.id}
        fieldKey="subtitle"
        html={content.subtitle}
        onSave={(html) => onEdit({ subtitle: html })}
        style={{
          margin: '0 0 28px 0',
          color: style.subtitleColor || '#e0e7ff',
          fontSize: style.subtitleFontSize,
          fontFamily: style.fontFamily,
          lineHeight: 1.6,
          textAlign: style.textAlign || 'center',
          minHeight: '1em',
        }}
      />
      {hasBtn ? (
        <a
          href={content.buttonHref || '#'}
          onClick={(e) => e.preventDefault()}
          style={{
            display: 'inline-block',
            backgroundColor: style.buttonBackgroundColor,
            color: style.buttonColor,
            padding: style.buttonPadding,
            borderRadius: style.buttonBorderRadius,
            fontSize: style.buttonFontSize,
            fontWeight: style.buttonFontWeight,
            fontFamily: style.fontFamily,
            textDecoration: 'none',
            cursor: 'default',
            userSelect: 'none',
          }}
          title={hasLink ? `Lien : ${content.buttonHref}` : 'URL non définie'}
        >
          {content.buttonText}
          {hasLink && <span style={{ fontSize: '0.7em', opacity: 0.7, marginLeft: 4 }}>↗</span>}
        </a>
      ) : (
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', pointerEvents: 'none' }}>
          (bouton masqué — saisir un texte pour l'afficher)
        </p>
      )}
    </div>
  )
}

function TextBlock({ block, onEdit }) {
  const { content, style } = block
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding }}>
      <InlineEditable
        as="div"
        blockId={block.id}
        fieldKey="text"
        html={content.text}
        onSave={(html) => onEdit({ text: html })}
        style={{
          margin: 0,
          color: style.color,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          lineHeight: style.lineHeight,
          textAlign: style.textAlign,
          fontWeight: style.fontWeight || 'normal',
          minHeight: '1em',
        }}
      />
    </div>
  )
}

function QuoteBlock({ block, onEdit }) {
  const { content, style } = block
  return (
    <div style={{
      backgroundColor: style.backgroundColor,
      padding: style.padding,
      borderLeft: `${style.borderWidth || '3px'} solid ${style.accentColor || '#6366f1'}`,
    }}>
      <InlineEditable
        as="p"
        blockId={block.id}
        fieldKey="text"
        html={content.text}
        onSave={(html) => onEdit({ text: html })}
        style={{
          margin: content.attribution ? '0 0 10px 0' : '0',
          color: style.color,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          lineHeight: style.lineHeight,
          fontStyle: style.fontStyle || 'italic',
          minHeight: '1em',
        }}
      />
      {content.attribution && (
        <p style={{ margin: 0, color: style.attributionColor || '#6b7280', fontSize: style.attributionFontSize || '12px', fontFamily: style.fontFamily }}>
          — {content.attribution}
        </p>
      )}
    </div>
  )
}

function ImageBlock({ block }) {
  const { content, style } = block
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding || '0', lineHeight: 0, fontSize: 0, position: 'relative' }}>
      <img
        src={content.src}
        alt={content.alt || ''}
        style={{ display: 'block', width: '100%', maxWidth: '100%', borderRadius: style.borderRadius || '0px' }}
      />
      {content.href && content.href !== 'https://' && (
        <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 9, padding: '2px 5px', borderRadius: 3, pointerEvents: 'none', userSelect: 'none' }}>
          ↗ lien
        </div>
      )}
    </div>
  )
}

function ButtonBlock({ block }) {
  const { content, style } = block
  const hasLink = content.href && content.href !== 'https://'
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, textAlign: style.textAlign || 'center' }}>
      <a
        href={content.href || '#'}
        onClick={(e) => e.preventDefault()}
        style={{
          display: 'inline-block',
          backgroundColor: style.buttonBackgroundColor,
          color: style.buttonColor,
          padding: style.buttonPadding,
          borderRadius: style.buttonBorderRadius,
          fontSize: style.buttonFontSize,
          fontWeight: style.buttonFontWeight,
          fontFamily: style.buttonFontFamily || 'Arial, Helvetica, sans-serif',
          textDecoration: 'none',
          cursor: 'default',
          userSelect: 'none',
        }}
        title={hasLink ? `Lien : ${content.href}` : 'URL non définie'}
      >
        {content.text}
        {hasLink && <span style={{ fontSize: '0.7em', opacity: 0.7, marginLeft: 4 }}>↗</span>}
      </a>
    </div>
  )
}

function ColumnsBlock({ block, onEdit }) {
  const { content, style } = block
  const gap = parseInt(style.gap || 24)
  const handleNestedSave = (colKey, fieldKey, html) => {
    const current = block.content[colKey] || {}
    onEdit({ [colKey]: { ...current, [fieldKey]: html } })
  }
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding }}>
      <div style={{ display: 'flex', gap: `${gap}px` }}>
        {['left', 'right'].map((colKey) => {
          const col = content[colKey] || {}
          return (
            <div key={colKey} style={{ flex: 1 }}>
              <InlineEditable
                as="h3"
                blockId={block.id}
                fieldKey="title"
                nestedKey={colKey}
                html={col.title || ''}
                onSave={(html) => handleNestedSave(colKey, 'title', html)}
                style={{
                  margin: '0 0 8px 0',
                  color: style.titleColor,
                  fontSize: style.titleFontSize,
                  fontWeight: style.titleFontWeight,
                  fontFamily: style.fontFamily,
                  minWidth: '2em',
                }}
              />
              <InlineEditable
                as="p"
                blockId={block.id}
                fieldKey="text"
                nestedKey={colKey}
                html={col.text || ''}
                onSave={(html) => handleNestedSave(colKey, 'text', html)}
                style={{
                  margin: 0,
                  color: style.color,
                  fontSize: style.fontSize,
                  fontFamily: style.fontFamily,
                  lineHeight: style.lineHeight,
                  minHeight: '1em',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EventsBlock({ block, onEdit }) {
  const { content, style } = block
  const events = content.events || []
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      {content.sectionTitle && (
        <div style={{
          fontSize: style.titleFontSize || '24px',
          fontWeight: 'bold',
          color: style.titleColor || '#4f6b58',
          marginBottom: '18px',
          lineHeight: 1.3,
        }}>
          {content.sectionTitle}
        </div>
      )}
      {events.map((evt, i) => (
        <div key={evt.id || i} style={{ marginBottom: i < events.length - 1 ? (style.cardGap || '12px') : '0' }}>
          <div style={{
            background: style.cardBackground || '#f7f1e6',
            padding: style.cardPadding || '18px',
            borderRadius: style.cardBorderRadius || '10px',
          }}>
            <div style={{ fontSize: '13px', color: evt.dateColor || '#7b3f57', fontWeight: 'bold' }}>{evt.dateLabel}</div>
            <div style={{ fontSize: style.eventTitleFontSize || '18px', fontWeight: 'bold', color: style.eventTitleColor || '#3f3328', marginTop: '4px' }}>
              {evt.title}
            </div>
            <div
              style={{ fontSize: style.descriptionFontSize || '15px', marginTop: '6px', color: style.descriptionColor || '#5a4b3e' }}
              dangerouslySetInnerHTML={{ __html: evt.description || '' }}
            />
            {evt.prix && (
              <div style={{ marginTop: '10px' }}>
                <span style={{
                  display: 'inline-block',
                  background: style.accentColor || style.titleColor || '#4f6b58',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '5px 14px',
                  borderRadius: '6px',
                }}>
                  {evt.prix}
                </span>
              </div>
            )}
            {evt.badge && (
              <div style={{ marginTop: '15px' }}>
                <span style={{
                  display: 'inline-block',
                  background: style.badgeBackground || '#222222',
                  color: style.badgeColor || '#ffffff',
                  fontSize: '13px',
                  padding: '8px 14px',
                  borderRadius: style.badgeBorderRadius || '20px',
                }}>
                  {evt.badge}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
      {events.length === 0 && (
        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, padding: '20px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #cbd5e1' }}>
          Aucun événement — ajoutez-en dans l'inspecteur
        </div>
      )}
    </div>
  )
}

function DividerBlock({ block }) {
  const { style } = block
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding }}>
      <hr style={{
        border: 'none',
        borderTop: `${style.borderWidth} ${style.borderStyle || 'solid'} ${style.borderColor}`,
        margin: 0,
      }} />
    </div>
  )
}

function SpacerBlock({ block }) {
  const { style } = block
  return (
    <div style={{
      backgroundColor: style.backgroundColor,
      height: style.height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* spacer indicator only visible in editor */}
      <span style={{ fontSize: 10, color: '#94a3b8', opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }}>
        espace — {style.height}
      </span>
    </div>
  )
}

function TestimonialBlock({ block }) {
  const { content, style } = block
  const stars = Math.min(5, Math.max(0, parseInt(content.stars) || 0))
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      <div style={{
        background: style.cardBackground || '#f5f3ff',
        borderRadius: style.cardBorderRadius || '14px',
        padding: style.cardPadding || '28px',
        position: 'relative',
      }}>
        {/* Accent quote mark */}
        <div style={{ fontSize: 40, lineHeight: 1, color: style.accentColor || '#7c3aed', opacity: 0.3, marginBottom: 8, fontFamily: 'Georgia, serif', userSelect: 'none' }}>"</div>
        {/* Stars */}
        {stars > 0 && (
          <div style={{ marginBottom: 12, fontSize: style.starSize || '18px', color: style.starColor || '#f59e0b' }}>
            {'★'.repeat(stars)}<span style={{ color: '#d1d5db' }}>{'★'.repeat(5 - stars)}</span>
          </div>
        )}
        {/* Quote */}
        <p style={{
          margin: '0 0 20px 0',
          color: style.quoteColor || '#1e1b4b',
          fontSize: style.quoteFontSize || '16px',
          lineHeight: style.quoteLineHeight || '1.7',
          fontStyle: 'italic',
        }}>
          {content.quote || ''}
        </p>
        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {content.avatarSrc && (
            <img src={content.avatarSrc} alt={content.name || ''} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          )}
          <div>
            <div style={{ fontWeight: 'bold', color: style.nameColor || '#4c1d95', fontSize: style.nameFontSize || '14px' }}>{content.name || ''}</div>
            <div style={{ color: style.roleColor || '#7c3aed', fontSize: style.roleFontSize || '12px', marginTop: 2 }}>{content.role || ''}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsBlock({ block }) {
  const { content, style } = block
  const items = content.items || []
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      <div style={{ display: 'flex', gap: style.gap || '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {items.map((item) => (
          <div key={item.id} style={{
            flex: 1,
            minWidth: 80,
            background: style.itemBackground || '#312e81',
            borderRadius: style.itemBorderRadius || '12px',
            padding: style.itemPadding || '20px 16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: style.iconSize || '28px', marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontSize: style.valueFontSize || '28px', fontWeight: style.valueFontWeight || 'bold', color: style.valueColor || '#ffffff', lineHeight: 1.1 }}>{item.value}</div>
            <div style={{ fontSize: style.labelFontSize || '12px', color: style.labelColor || '#a5b4fc', marginTop: 6, lineHeight: 1.3 }}>{item.label}</div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, padding: '20px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #cbd5e1', width: '100%' }}>
            Aucune stat — ajoutez-en dans l'inspecteur
          </div>
        )}
      </div>
    </div>
  )
}

function PricingBlock({ block }) {
  const { content, style } = block
  const features = content.features || []
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      <div style={{
        background: style.cardBackground || '#1e1b4b',
        borderRadius: style.cardBorderRadius || '16px',
        padding: style.cardPadding || '36px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Badge */}
        {content.badge && (
          <div style={{ marginBottom: 16 }}>
            <span style={{
              display: 'inline-block',
              background: style.badgeBackground || '#f59e0b',
              color: style.badgeColor || '#1c1917',
              fontSize: 12,
              fontWeight: 'bold',
              padding: '4px 12px',
              borderRadius: style.badgeBorderRadius || '20px',
            }}>
              {content.badge}
            </span>
          </div>
        )}
        {/* Plan name */}
        <div style={{ color: style.planNameColor || '#c4b5fd', fontSize: style.planNameFontSize || '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
          {content.planName}
        </div>
        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
          <span style={{ fontSize: style.priceFontSize || '52px', fontWeight: 'bold', color: style.priceColor || '#ffffff', lineHeight: 1 }}>{content.price}</span>
          <span style={{ fontSize: 24, color: style.priceColor || '#ffffff', fontWeight: 'bold' }}>{content.currency || '€'}</span>
          <span style={{ fontSize: style.periodFontSize || '16px', color: style.periodColor || '#a5b4fc' }}>{content.period}</span>
        </div>
        {/* Description */}
        {content.description && (
          <p style={{ margin: '0 0 20px 0', color: style.descriptionColor || '#c4b5fd', fontSize: style.descriptionFontSize || '14px', lineHeight: 1.6 }}>{content.description}</p>
        )}
        {/* Separator */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 20 }} />
        {/* Features */}
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ color: style.checkColor || '#6ee7b7', fontSize: 16, flexShrink: 0 }}>✓</span>
            <span style={{ color: style.featureColor || '#e0e7ff', fontSize: style.featureFontSize || '14px' }}>{f}</span>
          </div>
        ))}
        {/* CTA */}
        {content.ctaText && (
          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <a
              href={content.ctaHref || '#'}
              onClick={(e) => e.preventDefault()}
              style={{
                display: 'inline-block',
                background: style.ctaBackground || '#6366f1',
                color: style.ctaColor || '#ffffff',
                padding: style.ctaPadding || '14px 32px',
                borderRadius: style.ctaBorderRadius || '8px',
                fontSize: style.ctaFontSize || '15px',
                fontWeight: 'bold',
                textDecoration: 'none',
                cursor: 'default',
              }}
            >
              {content.ctaText}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function HighlightBlock({ block }) {
  const { content, style } = block
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      <div style={{
        background: style.cardBackground || '#eff6ff',
        borderLeft: `${style.borderWidth || '3px'} solid ${style.borderColor || '#3b82f6'}`,
        borderRadius: style.cardBorderRadius || '10px',
        padding: style.cardPadding || '20px 24px',
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
      }}>
        {content.icon && (
          <span style={{ fontSize: style.iconSize || '28px', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{content.icon}</span>
        )}
        <div>
          {content.title && (
            <div style={{ fontWeight: style.titleFontWeight || 'bold', color: style.titleColor || '#1e40af', fontSize: style.titleFontSize || '16px', marginBottom: 6 }}>
              {content.title}
            </div>
          )}
          <div style={{ color: style.textColor || '#1d4ed8', fontSize: style.textFontSize || '14px', lineHeight: style.textLineHeight || '1.6' }}>
            {content.text}
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialBlock({ block }) {
  const { content, style } = block
  const links = content.links || []
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily, textAlign: style.textAlign || 'center' }}>
      {content.title && (
        <div style={{ color: style.titleColor || '#374151', fontSize: style.titleFontSize || '15px', fontWeight: style.titleFontWeight || '600', marginBottom: 16 }}>
          {content.title}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: style.textAlign === 'left' ? 'flex-start' : style.textAlign === 'right' ? 'flex-end' : 'center', gap: style.gap || '12px', flexWrap: 'wrap' }}>
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url || '#'}
            onClick={(e) => e.preventDefault()}
            title={link.platform}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: style.buttonSize || '48px',
              height: style.buttonSize || '48px',
              borderRadius: style.buttonBorderRadius || '50%',
              background: link.color || '#6366f1',
              fontSize: style.buttonFontSize || '22px',
              textDecoration: 'none',
              cursor: 'default',
              flexShrink: 0,
            }}
          >
            {link.icon}
          </a>
        ))}
        {links.length === 0 && (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, padding: '10px 20px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #cbd5e1' }}>
            Aucun lien — ajoutez-en dans l'inspecteur
          </div>
        )}
      </div>
    </div>
  )
}

function CountdownBlock({ block }) {
  const { content, style } = block
  // Compute remaining time
  let days = 0, hours = 0, mins = 0
  if (content.targetDate) {
    const [y, m, d] = content.targetDate.split('-').map(Number)
    const [th, tm] = (content.targetTime || '00:00').split(':').map(Number)
    const target = new Date(y, m - 1, d, th, tm, 0)
    const now = new Date()
    const diff = Math.max(0, target - now)
    days = Math.floor(diff / 86400000)
    hours = Math.floor((diff % 86400000) / 3600000)
    mins = Math.floor((diff % 3600000) / 60000)
  }

  const boxes = [
    { value: String(days).padStart(2, '0'), label: content.labelDays || 'Jours' },
    { value: String(hours).padStart(2, '0'), label: content.labelHours || 'Heures' },
    { value: String(mins).padStart(2, '0'), label: content.labelMins || 'Minutes' },
  ]

  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily, textAlign: style.textAlign || 'center' }}>
      {content.title && (
        <div style={{ color: style.titleColor || '#ffffff', fontSize: style.titleFontSize || '20px', fontWeight: style.titleFontWeight || 'bold', marginBottom: 24 }}>
          {content.title}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: style.gap || '10px', alignItems: 'flex-start' }}>
        {boxes.map((box, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: style.gap || '10px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: style.boxSize || '80px',
                height: style.boxSize || '80px',
                background: style.boxBackground || '#312e81',
                borderRadius: style.boxBorderRadius || '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: style.numberFontSize || '36px', fontWeight: style.numberFontWeight || 'bold', color: style.numberColor || '#ffffff', fontVariantNumeric: 'tabular-nums' }}>
                  {box.value}
                </span>
              </div>
              <div style={{ marginTop: 6, fontSize: style.labelFontSize || '11px', color: style.labelColor || '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {box.label}
              </div>
            </div>
            {i < boxes.length - 1 && (
              <span style={{ fontSize: parseInt(style.numberFontSize || '36px') * 0.8, color: style.separatorColor || '#6366f1', fontWeight: 'bold', paddingBottom: 28 }}>:</span>
            )}
          </div>
        ))}
      </div>
      {!content.targetDate && (
        <p style={{ margin: '16px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>(Définissez une date cible dans l'inspecteur)</p>
      )}
    </div>
  )
}

const BLOCK_RENDERERS = {
  header: HeaderBlock,
  heading: HeadingBlock,
  footer: FooterBlock,
  hero: HeroBlock,
  text: TextBlock,
  quote: QuoteBlock,
  image: ImageBlock,
  button: ButtonBlock,
  columns: ColumnsBlock,
  events: EventsBlock,
  divider: DividerBlock,
  spacer: SpacerBlock,
  testimonial: TestimonialBlock,
  stats: StatsBlock,
  pricing: PricingBlock,
  highlight: HighlightBlock,
  social: SocialBlock,
  countdown: CountdownBlock,
}

function MeetingAgendaBlock({ block }) {
  const { content, style } = block
  const items = content.items || []
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      {/* Header */}
      <div style={{
        background: style.headerBackground || '#f0f4ff',
        borderLeft: `4px solid ${style.headerBorderColor || '#6366f1'}`,
        padding: '14px 20px',
        marginBottom: 20,
        borderRadius: '0 8px 8px 0',
      }}>
        <div style={{ fontWeight: 'bold', fontSize: style.titleFontSize || '20px', color: style.titleColor || '#1e1b4b' }}>{content.title || 'Ordre du jour'}</div>
        {content.subtitle && <div style={{ fontSize: style.subtitleFontSize || '13px', color: style.subtitleColor || '#6b7280', marginTop: 4 }}>{content.subtitle}</div>}
      </div>
      {/* Items */}
      {items.map((item, i) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, paddingBottom: i < items.length - 1 ? 14 : 0, marginBottom: i < items.length - 1 ? 14 : 0, borderBottom: i < items.length - 1 ? `1px solid ${style.dividerColor || '#e5e7eb'}` : 'none' }}>
          <div style={{ width: 28, height: 28, background: style.numberBackground || '#6366f1', color: style.numberColor || '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            {item.time && <div style={{ fontSize: style.timeFontSize || '12px', color: style.timeColor || '#6366f1', fontWeight: 600, marginBottom: 2 }}>{item.time}</div>}
            <div style={{ fontSize: style.itemFontSize || '14px', color: style.itemColor || '#1f2937', lineHeight: 1.5 }}>{item.text}</div>
          </div>
        </div>
      ))}
      {items.length === 0 && <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, padding: '20px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #cbd5e1' }}>Aucun point — ajoutez-en dans l'inspecteur</div>}
    </div>
  )
}

function PracticalInfoBlock({ block }) {
  const { content, style } = block
  const items = content.items || []
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      {content.title && <div style={{ fontWeight: style.titleFontWeight || 'bold', fontSize: style.titleFontSize || '18px', color: style.titleColor || '#1e1b4b', marginBottom: 14 }}>{content.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: style.gap || '8px' }}>
        {items.map((item) => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: style.cardBackground || '#f9fafb',
            borderRadius: style.cardBorderRadius || '10px',
            padding: style.cardPadding || '12px 16px',
            borderLeft: `3px solid ${style.accentColor || '#6366f1'}`,
          }}>
            <span style={{ fontSize: style.iconSize || '20px', flexShrink: 0 }}>{item.icon}</span>
            <div>
              {item.label && <div style={{ fontSize: style.labelFontSize || '11px', color: style.labelColor || '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{item.label}</div>}
              <div style={{ fontSize: style.valueFontSize || '14px', color: style.valueColor || '#111827', fontWeight: 500 }}>{item.value}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, padding: '20px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #cbd5e1' }}>Aucune ligne — ajoutez-en dans l'inspecteur</div>}
      </div>
    </div>
  )
}

function NewsItemsBlock({ block }) {
  const { content, style } = block
  const items = content.items || []
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      {content.title && <div style={{ fontWeight: style.titleFontWeight || 'bold', fontSize: style.titleFontSize || '20px', color: style.titleColor || '#1e1b4b', marginBottom: 16, paddingBottom: 10, borderBottom: `2px solid ${style.dividerColor || '#e5e7eb'}` }}>{content.title}</div>}
      {items.map((item, i) => (
        <div key={item.id} style={{ paddingBottom: i < items.length - 1 ? 16 : 0, marginBottom: i < items.length - 1 ? 16 : 0, borderBottom: i < items.length - 1 ? `1px solid ${style.dividerColor || '#e5e7eb'}` : 'none' }}>
          {item.category && (
            <span style={{ display: 'inline-block', background: style.categoryBackground || '#e0e7ff', color: style.categoryColor || '#3730a3', fontSize: style.categoryFontSize || '10px', fontWeight: 700, padding: '2px 7px', borderRadius: style.categoryBorderRadius || '4px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{item.category}</span>
          )}
          <div style={{ fontWeight: 'bold', fontSize: style.headlineFontSize || '15px', color: style.headlineColor || '#111827', marginBottom: 5 }}>{item.headline}</div>
          {item.text && <div style={{ fontSize: style.textFontSize || '13px', color: style.textColor || '#4b5563', lineHeight: style.textLineHeight || '1.6' }}>{item.text}</div>}
          {item.href && (
            <a href={item.href} onClick={(e) => e.preventDefault()} style={{ display: 'inline-block', marginTop: 6, fontSize: 12, color: style.linkColor || '#6366f1', fontWeight: 600 }}>Lire la suite →</a>
          )}
        </div>
      ))}
      {items.length === 0 && <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, padding: '20px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #cbd5e1' }}>Aucun article — ajoutez-en dans l'inspecteur</div>}
    </div>
  )
}

function VolunteerBlock({ block }) {
  const { content, style } = block
  return (
    <div style={{ backgroundColor: style.backgroundColor, padding: style.padding, fontFamily: style.fontFamily }}>
      {/* Header */}
      <div style={{ background: style.headerBackground || '#fef3c7', borderLeft: `4px solid ${style.headerBorderColor || '#f59e0b'}`, padding: '14px 20px', borderRadius: '0 8px 8px 0', marginBottom: 20 }}>
        <div style={{ fontWeight: 'bold', fontSize: style.titleFontSize || '20px', color: style.titleColor || '#92400e' }}>{content.title}</div>
      </div>
      {/* Role */}
      {content.role && (
        <div style={{ fontWeight: style.roleFontWeight || 'bold', fontSize: style.roleFontSize || '16px', color: style.roleColor || '#1f2937', marginBottom: 10 }}>{content.role}</div>
      )}
      {/* Description */}
      {content.description && (
        <p style={{ margin: '0 0 16px 0', fontSize: style.descriptionFontSize || '14px', color: style.descriptionColor || '#374151', lineHeight: style.descriptionLineHeight || '1.7' }}>{content.description}</p>
      )}
      {/* Info strip */}
      <div style={{ background: style.infoBackground || '#fffbeb', padding: '10px 16px', borderRadius: 8, marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {content.dates && <span style={{ fontSize: style.infoFontSize || '13px', color: style.infoColor || '#92400e' }}>📅 {content.dates}</span>}
        {content.spots && <span style={{ display: 'inline-block', background: style.spotsBackground || '#22c55e', color: style.spotsColor || '#ffffff', fontSize: 12, fontWeight: 'bold', padding: '3px 10px', borderRadius: style.spotsBorderRadius || '20px' }}>{content.spots}</span>}
      </div>
      {/* CTA */}
      {content.ctaLabel && (
        <a href={content.ctaHref || '#'} onClick={(e) => e.preventDefault()} style={{ display: 'inline-block', background: style.ctaBackground || '#f59e0b', color: style.ctaColor || '#1c1917', padding: style.ctaPadding || '12px 28px', borderRadius: style.ctaBorderRadius || '6px', fontSize: style.ctaFontSize || '14px', fontWeight: 'bold', textDecoration: 'none', cursor: 'default' }}>
          {content.ctaLabel}
        </a>
      )}
    </div>
  )
}

const EXTRA_BLOCK_RENDERERS = {
  'meeting-agenda': MeetingAgendaBlock,
  'practical-info': PracticalInfoBlock,
  'news-items': NewsItemsBlock,
  volunteer: VolunteerBlock,
}

// ─── Canvas Block Wrapper ────────────────────────────────────────────────────

export default function CanvasBlock({ block, isDraggingFromLibrary, openRTE }) {
  const { selectedId, selectBlock, deleteBlock, duplicateBlock, updateBlockContent } = useEditorStore()
  const isSelected = selectedId === block.id
  const [isHovered, setIsHovered] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    disabled: isDraggingFromLibrary,
  })

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      selectBlock(block.id)
    },
    [block.id, selectBlock]
  )

  const handleDoubleClick = useCallback(
    (e) => {
      if ((block.type === 'text' || block.type === 'footer' || block.type === 'quote') && openRTE) {
        e.stopPropagation()
        openRTE(block.id, 'text')
      }
    },
    [block.id, block.type, openRTE]
  )

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation()
      deleteBlock(block.id)
    },
    [block.id, deleteBlock]
  )

  const handleDuplicate = useCallback(
    (e) => {
      e.stopPropagation()
      duplicateBlock(block.id)
    },
    [block.id, duplicateBlock]
  )

  const handleEdit = useCallback(
    (partial) => updateBlockContent(block.id, partial),
    [block.id, updateBlockContent]
  )

  const Renderer = BLOCK_RENDERERS[block.type] || EXTRA_BLOCK_RENDERERS[block.type]
  if (!Renderer) return null

  return (
    <div
      ref={setNodeRef}
      style={sortableStyle}
      className={`canvas-block${isSelected ? ' selected' : ''}${isHovered ? ' hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* Controls overlay */}
      <div className={`block-overlay${isSelected || isHovered ? ' visible' : ''}`}>
        <div className="block-drag-handle" {...attributes} {...listeners} title="Déplacer">⠿</div>
        <span className="block-type-badge">{block.type}</span>

        {block.type === 'heading' && (
          <div className="block-level-group">
            {['h1', 'h2', 'h3'].map((lvl) => (
              <button
                key={lvl}
                className={`block-level-btn${block.content.level === lvl ? ' active' : ''}`}
                onClick={(e) => { e.stopPropagation(); updateBlockContent(block.id, { level: lvl }) }}
                title={`Changer en ${lvl.toUpperCase()}`}
              >
                {lvl.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {(block.type === 'text' || block.type === 'footer' || block.type === 'quote') && openRTE && (
          <button
            className="block-edit-text-btn"
            onClick={(e) => { e.stopPropagation(); openRTE(block.id, 'text') }}
            title="Éditer en plein écran (double-clic aussi)"
          >✎</button>
        )}
        <button className="block-duplicate-btn" onClick={handleDuplicate} title="Dupliquer">⎘</button>
        <button className="block-delete-btn" onClick={handleDelete} title="Supprimer">✕</button>
      </div>


      {/* Block content */}
      <Renderer block={block} onEdit={handleEdit} />
    </div>
  )
}
