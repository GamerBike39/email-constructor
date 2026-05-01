function esc(str) {
  if (str === null || str === undefined) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function px(val) {
  if (!val && val !== 0) return '0px'
  const s = String(val)
  return s.includes('px') || s.includes('%') || s.includes('em') ? s : `${s}px`
}

export function exportToHTML(blocks, settings) {
  const {
    backgroundColor = '#f0f0f0',
    maxWidth = '600',
    fontFamily = 'Arial, Helvetica, sans-serif',
    previewText = '',
    subject = 'Email',
  } = settings

  const mw = px(maxWidth)
  const bodyRows = blocks.map((b) => renderBlock(b)).join('\n')

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${esc(subject)}</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    body, #bodyTable { margin: 0; padding: 0; width: 100% !important; }
    body { background-color: ${backgroundColor}; font-family: ${fontFamily}; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; display: block; max-width: 100%; -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-wrapper { width: 100% !important; }
      .col-half { width: 100% !important; display: block !important; padding: 0 0 16px 0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${backgroundColor};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  ${previewText ? `<div style="display:none;font-size:1px;color:${backgroundColor};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(previewText)}&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ''}
  <table id="bodyTable" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:${backgroundColor};">
    <tr>
      <td align="center" valign="top">
        <table class="email-wrapper" role="presentation" cellspacing="0" cellpadding="0" border="0" width="${parseInt(maxWidth) || 600}" style="max-width:${mw};width:100%;">
${bodyRows}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function renderBlock(block) {
  const { type, content, style } = block
  switch (type) {
    case 'header':  return renderHeader(content, style)
    case 'heading': return renderHeading(content, style)
    case 'footer':  return renderFooter(content, style)
    case 'hero':    return renderHero(content, style)
    case 'text':    return renderText(content, style)
    case 'quote':   return renderQuote(content, style)
    case 'image':   return renderImage(content, style)
    case 'button':  return renderButton(content, style)
    case 'columns': return renderColumns(content, style)
    case 'events':  return renderEvents(content, style)
    case 'divider': return renderDivider(content, style)
    case 'spacer':  return renderSpacer(content, style)
    case 'testimonial': return renderTestimonial(content, style)
    case 'stats':   return renderStats(content, style)
    case 'pricing': return renderPricing(content, style)
    case 'highlight': return renderHighlight(content, style)
    case 'social':  return renderSocial(content, style)
    case 'countdown': return renderCountdown(content, style)
    case 'meeting-agenda': return renderMeetingAgenda(content, style)
    case 'practical-info': return renderPracticalInfo(content, style)
    case 'news-items': return renderNewsItems(content, style)
    case 'volunteer': return renderVolunteer(content, style)
    default:        return ''
  }
}

function renderMeetingAgenda(content, style) {
  const items = content.items || []
  const itemsHtml = items.map((item, i) => `
    <tr>
      <td style="padding:${i === 0 ? '0' : '14px'} 0 14px 0; border-bottom:${i < items.length - 1 ? `1px solid ${style.dividerColor || '#e5e7eb'}` : 'none'};">
        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr>
            <td style="width:32px; vertical-align:top;">
              <div style="width:28px;height:28px;background:${style.numberBackground || '#6366f1'};color:${style.numberColor || '#ffffff'};border-radius:50%;font-size:12px;font-weight:bold;text-align:center;line-height:28px;">${i + 1}</div>
            </td>
            <td style="padding-left:12px;">
              ${item.time ? `<div style="font-size:${style.timeFontSize || '12px'};color:${style.timeColor || '#6366f1'};font-weight:600;margin-bottom:2px;">${item.time}</div>` : ''}
              <div style="font-size:${style.itemFontSize || '14px'};color:${style.itemColor || '#1f2937'};line-height:1.5;">${item.text}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join('')
  return `<tr><td style="background:${style.backgroundColor || '#ffffff'};padding:${style.padding || '28px 40px'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">
    <div style="background:${style.headerBackground || '#f0f4ff'};border-left:4px solid ${style.headerBorderColor || '#6366f1'};padding:14px 20px;margin-bottom:20px;">
      <div style="font-weight:bold;font-size:${style.titleFontSize || '20px'};color:${style.titleColor || '#1e1b4b'};">${content.title || 'Ordre du jour'}</div>
      ${content.subtitle ? `<div style="font-size:${style.subtitleFontSize || '13px'};color:${style.subtitleColor || '#6b7280'};margin-top:4px;">${content.subtitle}</div>` : ''}
    </div>
    <table cellpadding="0" cellspacing="0" style="width:100%;">${itemsHtml}</table>
  </td></tr>`
}

function renderPracticalInfo(content, style) {
  const items = content.items || []
  const itemsHtml = items.map((item) => `
    <tr><td style="padding:0 0 ${style.gap || '8px'} 0;">
      <table cellpadding="0" cellspacing="0" style="width:100%;background:${style.cardBackground || '#f9fafb'};border-radius:${style.cardBorderRadius || '10px'};border-left:3px solid ${style.accentColor || '#6366f1'};">
        <tr>
          <td style="padding:${style.cardPadding || '12px 16px'};width:36px;font-size:${style.iconSize || '20px'};vertical-align:middle;">${item.icon}</td>
          <td style="padding:${style.cardPadding || '12px 16px'};padding-left:0;">
            ${item.label ? `<div style="font-size:${style.labelFontSize || '11px'};color:${style.labelColor || '#6b7280'};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">${item.label}</div>` : ''}
            <div style="font-size:${style.valueFontSize || '14px'};color:${style.valueColor || '#111827'};font-weight:500;">${item.value}</div>
          </td>
        </tr>
      </table>
    </td></tr>`).join('')
  return `<tr><td style="background:${style.backgroundColor || '#ffffff'};padding:${style.padding || '28px 40px'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">
    ${content.title ? `<div style="font-weight:${style.titleFontWeight || 'bold'};font-size:${style.titleFontSize || '18px'};color:${style.titleColor || '#1e1b4b'};margin-bottom:14px;">${content.title}</div>` : ''}
    <table cellpadding="0" cellspacing="0" style="width:100%;">${itemsHtml}</table>
  </td></tr>`
}

function renderNewsItems(content, style) {
  const items = content.items || []
  const itemsHtml = items.map((item, i) => `
    <tr><td style="padding-bottom:${i < items.length - 1 ? '16px' : '0'};border-bottom:${i < items.length - 1 ? `1px solid ${style.dividerColor || '#e5e7eb'}` : 'none'};margin-bottom:${i < items.length - 1 ? '16px' : '0'};">
      ${item.category ? `<div style="display:inline-block;background:${style.categoryBackground || '#e0e7ff'};color:${style.categoryColor || '#3730a3'};font-size:${style.categoryFontSize || '10px'};font-weight:700;padding:2px 7px;border-radius:${style.categoryBorderRadius || '4px'};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${item.category}</div>` : ''}
      <div style="font-weight:bold;font-size:${style.headlineFontSize || '15px'};color:${style.headlineColor || '#111827'};margin-bottom:5px;">${item.headline}</div>
      ${item.text ? `<div style="font-size:${style.textFontSize || '13px'};color:${style.textColor || '#4b5563'};line-height:${style.textLineHeight || '1.6'};">${item.text}</div>` : ''}
      ${item.href ? `<a href="${item.href}" style="display:inline-block;margin-top:6px;font-size:12px;color:${style.linkColor || '#6366f1'};font-weight:600;">Lire la suite →</a>` : ''}
    </td></tr>`).join('')
  return `<tr><td style="background:${style.backgroundColor || '#ffffff'};padding:${style.padding || '28px 40px'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">
    ${content.title ? `<div style="font-weight:bold;font-size:${style.titleFontSize || '20px'};color:${style.titleColor || '#1e1b4b'};margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid ${style.dividerColor || '#e5e7eb'};">${content.title}</div>` : ''}
    <table cellpadding="0" cellspacing="0" style="width:100%;">${itemsHtml}</table>
  </td></tr>`
}

function renderVolunteer(content, style) {
  return `<tr><td style="background:${style.backgroundColor || '#ffffff'};padding:${style.padding || '24px 40px'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">
    <div style="background:${style.headerBackground || '#fef3c7'};border-left:4px solid ${style.headerBorderColor || '#f59e0b'};padding:14px 20px;margin-bottom:20px;">
      <div style="font-weight:bold;font-size:${style.titleFontSize || '20px'};color:${style.titleColor || '#92400e'};">${content.title}</div>
    </div>
    ${content.role ? `<div style="font-weight:${style.roleFontWeight || 'bold'};font-size:${style.roleFontSize || '16px'};color:${style.roleColor || '#1f2937'};margin-bottom:10px;">${content.role}</div>` : ''}
    ${content.description ? `<p style="margin:0 0 16px 0;font-size:${style.descriptionFontSize || '14px'};color:${style.descriptionColor || '#374151'};line-height:${style.descriptionLineHeight || '1.7'};">${content.description}</p>` : ''}
    <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:16px;">
      <tr><td style="background:${style.infoBackground || '#fffbeb'};padding:10px 16px;border-radius:8px;">
        ${content.dates ? `<span style="font-size:${style.infoFontSize || '13px'};color:${style.infoColor || '#92400e'};margin-right:16px;">📅 ${content.dates}</span>` : ''}
        ${content.spots ? `<span style="display:inline-block;background:${style.spotsBackground || '#22c55e'};color:${style.spotsColor || '#ffffff'};font-size:12px;font-weight:bold;padding:3px 10px;border-radius:${style.spotsBorderRadius || '20px'};">${content.spots}</span>` : ''}
      </td></tr>
    </table>
    ${content.ctaLabel ? `<a href="${content.ctaHref || '#'}" style="display:inline-block;background:${style.ctaBackground || '#f59e0b'};color:${style.ctaColor || '#1c1917'};padding:${style.ctaPadding || '12px 28px'};border-radius:${style.ctaBorderRadius || '6px'};font-size:${style.ctaFontSize || '14px'};font-weight:bold;text-decoration:none;">${content.ctaLabel}</a>` : ''}
  </td></tr>`
}

function renderHeading(content, style) {
  const tag = content.level || 'h1'
  const fontSizeMap = { h1: '32px', h2: '26px', h3: '20px' }
  const fontSize = style.fontSize || fontSizeMap[tag] || '26px'
  const htmlText = content.text || ''
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <${tag} style="margin:0;color:${style.color};font-size:${fontSize};font-family:${style.fontFamily};font-weight:${style.fontWeight || 'bold'};line-height:${style.lineHeight || '1.2'};text-align:${style.textAlign || 'left'}">${htmlText}</${tag}>
            </td>
          </tr>`
}

function renderQuote(content, style) {
  const htmlText = content.text || ''
  const borderStyle = `border-left:${style.borderWidth || '3px'} solid ${style.accentColor || '#6366f1'}`
  const attrRow = content.attribution
    ? `\n              <p style="margin:8px 0 0 0;color:${style.attributionColor || '#6b7280'};font-size:${style.attributionFontSize || '12px'};font-family:${style.fontFamily};font-style:normal;">&mdash; ${esc(content.attribution)}</p>`
    : ''
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};${borderStyle};">
              <p style="margin:0;color:${style.color};font-size:${style.fontSize};font-family:${style.fontFamily};line-height:${style.lineHeight};font-style:${style.fontStyle || 'italic'}">${htmlText}</p>${attrRow}
            </td>
          </tr>`
}

function renderHeader(content, style) {
  const inner = content.logoSrc
    ? `<img src="${esc(content.logoSrc)}" alt="${esc(content.logoText)}" style="max-height:48px;display:inline-block;" />`
    : `<span style="color:${style.color};font-size:${style.fontSize};font-family:${style.fontFamily};font-weight:${style.fontWeight};letter-spacing:${style.letterSpacing || '0px'};">${esc(content.logoText)}</span>`
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" align="${style.textAlign || 'center'}" style="background-color:${style.backgroundColor};padding:${style.padding};text-align:${style.textAlign || 'center'};">
              ${inner}
            </td>
          </tr>`
}

function renderFooter(content, style) {
  // content.text is now HTML (richtext) — use directly, do not escape
  const htmlContent = content.text || ''
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" align="${style.textAlign || 'center'}" style="background-color:${style.backgroundColor};padding:${style.padding};text-align:${style.textAlign || 'center'};">
              <p style="margin:0;color:${style.color};font-size:${style.fontSize};font-family:${style.fontFamily};line-height:${style.lineHeight};">${htmlContent}</p>
            </td>
          </tr>`
}

function renderHero(content, style) {
  const hasBtn = content.showButton !== false && content.buttonText && content.buttonText.trim()
  const btnStyle = `display:inline-block;background-color:${style.buttonBackgroundColor};color:${style.buttonColor};padding:${style.buttonPadding};border-radius:${style.buttonBorderRadius};font-size:${style.buttonFontSize};font-weight:${style.buttonFontWeight};font-family:${style.fontFamily};text-decoration:none;mso-padding-alt:${style.buttonPadding};`
  const imgRow = content.imageSrc
    ? `              <img src="${esc(content.imageSrc)}" alt="" width="600" style="display:block;width:100%;max-width:100%;margin-bottom:24px;" />\n`
    : ''
  const btnRow = hasBtn
    ? `\n              <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${esc(content.buttonHref || '#')}" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="8%" fillcolor="${style.buttonBackgroundColor}"><w:anchorlock/><center><![endif]--><a href="${esc(content.buttonHref || '#')}" style="${btnStyle}">${esc(content.buttonText)}</a><!--[if mso]></center></v:roundrect><![endif]-->`
    : ''
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" align="${style.textAlign || 'center'}" style="background-color:${style.backgroundColor};padding:${style.padding};text-align:${style.textAlign || 'center'};">
${imgRow}              <h1 style="margin:0 0 14px 0;color:${style.titleColor || style.color};font-size:${style.titleFontSize};font-weight:${style.titleFontWeight};font-family:${style.fontFamily};line-height:1.25;">${content.title || ''}</h1>
              <p style="margin:0 0 28px 0;color:${style.subtitleColor || style.color};font-size:${style.subtitleFontSize};font-family:${style.fontFamily};line-height:1.6;">${content.subtitle || ''}</p>${btnRow}
            </td>
          </tr>`
}

function renderText(content, style) {
  // content.text is now HTML (richtext) — use directly, do not escape
  const htmlContent = content.text || ''
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <div style="margin:0;color:${style.color};font-size:${style.fontSize};font-family:${style.fontFamily};line-height:${style.lineHeight};text-align:${style.textAlign};font-weight:${style.fontWeight || 'normal'}">${htmlContent}</div>
            </td>
          </tr>`
}

function renderImage(content, style) {
  const img = `<img src="${esc(content.src)}" alt="${esc(content.alt || '')}" width="600" style="display:block;width:100%;max-width:100%;border-radius:${style.borderRadius || '0px'};" />`
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" align="center" style="background-color:${style.backgroundColor};padding:${style.padding};line-height:0;font-size:0;">
              ${content.href ? `<a href="${esc(content.href)}" style="display:block;">${img}</a>` : img}
            </td>
          </tr>`
}

function renderButton(content, style) {
  const btnStyle = `display:inline-block;background-color:${style.buttonBackgroundColor};color:${style.buttonColor};padding:${style.buttonPadding};border-radius:${style.buttonBorderRadius};font-size:${style.buttonFontSize};font-weight:${style.buttonFontWeight};font-family:${style.buttonFontFamily || 'Arial, Helvetica, sans-serif'};text-decoration:none;`
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" align="${style.textAlign || 'center'}" style="background-color:${style.backgroundColor};padding:${style.padding};text-align:${style.textAlign || 'center'};">
              <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${esc(content.href || '#')}" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="8%" fillcolor="${style.buttonBackgroundColor}"><w:anchorlock/><center><![endif]--><a href="${esc(content.href || '#')}" style="${btnStyle}">${esc(content.text)}</a><!--[if mso]></center></v:roundrect><![endif]-->
            </td>
          </tr>`
}

function renderColumns(content, style) {
  const half = `width:48%;display:inline-block;vertical-align:top;`
  const gap = parseInt(style.gap || 24)
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <!--[if mso]><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td width="48%" valign="top" style="padding-right:${Math.round(gap / 2)}px;"><![endif]-->
              <div class="col-half" style="${half}padding-right:${Math.round(gap / 2)}px;">
                <h3 style="margin:0 0 8px 0;color:${style.titleColor};font-size:${style.titleFontSize};font-weight:${style.titleFontWeight};font-family:${style.fontFamily};">${esc(content.left?.title)}</h3>
                <p style="margin:0;color:${style.color};font-size:${style.fontSize};font-family:${style.fontFamily};line-height:${style.lineHeight};">${content.left?.text || ''}</p>
              </div>
              <!--[if mso]></td><td width="48%" valign="top" style="padding-left:${Math.round(gap / 2)}px;"><![endif]-->
              <div class="col-half" style="${half}padding-left:${Math.round(gap / 2)}px;">
                <h3 style="margin:0 0 8px 0;color:${style.titleColor};font-size:${style.titleFontSize};font-weight:${style.titleFontWeight};font-family:${style.fontFamily};">${esc(content.right?.title)}</h3>
                <p style="margin:0;color:${style.color};font-size:${style.fontSize};font-family:${style.fontFamily};line-height:${style.lineHeight};">${content.right?.text || ''}</p>
              </div>
              <!--[if mso]></td></tr></table><![endif]-->
            </td>
          </tr>`
}

function renderEvents(content, style) {
  const events = content.events || []
  const gap = style.cardGap || '12px'

  const titleRow = content.sectionTitle
    ? `          <tr>
            <td style="padding-bottom:18px;font-size:${style.titleFontSize || '24px'};font-weight:bold;color:${style.titleColor || '#4f6b58'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:1.3;">${esc(content.sectionTitle)}</td>
          </tr>\n`
    : ''

  const eventRows = events.map((evt, i) => {
    const isLast = i === events.length - 1
    const badgeHtml = evt.badge
      ? `\n                    <div style="margin-top:15px;"><span style="display:inline-block;background:${style.badgeBackground || '#222222'};color:${style.badgeColor || '#ffffff'};font-size:13px;padding:8px 14px;border-radius:${style.badgeBorderRadius || '20px'};">${esc(evt.badge)}</span></div>`
      : ''
    return `          <tr>
            <td style="padding-bottom:${isLast ? '0' : gap};">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:${style.cardBackground || '#f7f1e6'};padding:${style.cardPadding || '18px'};border-radius:${style.cardBorderRadius || '10px'};">
                    <div style="font-size:13px;color:${evt.dateColor || '#7b3f57'};font-weight:bold;font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${esc(evt.dateLabel || '')}</div>
                    <div style="font-size:${style.eventTitleFontSize || '18px'};font-weight:bold;color:${style.eventTitleColor || '#3f3328'};margin-top:4px;font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${esc(evt.title || '')}</div>
                    <div style="font-size:${style.descriptionFontSize || '15px'};margin-top:6px;color:${style.descriptionColor || '#5a4b3e'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${evt.description || ''}</div>${evt.prix ? `\n                    <div style="margin-top:10px;"><span style="display:inline-block;background:${style.titleColor || '#4f6b58'};color:#ffffff;font-size:14px;font-weight:bold;padding:5px 14px;border-radius:6px;">${esc(evt.prix)}</span></div>` : ''}${badgeHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
  }).join('\n')

  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
${titleRow}${eventRows}
              </table>
            </td>
          </tr>`
}

function renderDivider(content, style) {
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <hr style="border:none;border-top:${style.borderWidth} ${style.borderStyle || 'solid'} ${style.borderColor};margin:0;padding:0;" />
            </td>
          </tr>`
}

function renderSpacer(content, style) {
  const h = style.height || '40px'
  return `          <tr>
            <td bgcolor="${style.backgroundColor || '#ffffff'}" height="${parseInt(h) || 40}" style="background-color:${style.backgroundColor || '#ffffff'};height:${h};font-size:${h};line-height:${h};">&nbsp;</td>
          </tr>`
}

function renderTestimonial(content, style) {
  const stars = Math.min(5, Math.max(0, parseInt(content.stars) || 0))
  const starsHtml = stars > 0
    ? `<div style="font-size:${style.starSize || '18px'};color:${style.starColor || '#f59e0b'};margin-bottom:12px;">${'&#9733;'.repeat(stars)}</div>`
    : ''
  const avatarHtml = content.avatarSrc
    ? `<img src="${esc(content.avatarSrc)}" alt="${esc(content.name || '')}" width="40" height="40" style="display:inline-block;width:40px;height:40px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:12px;" />`
    : ''
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:${style.cardBackground || '#f5f3ff'};border-radius:${style.cardBorderRadius || '14px'};padding:${style.cardPadding || '28px'};">
                    <div style="font-size:36px;line-height:1;color:${style.accentColor || '#7c3aed'};opacity:0.3;margin-bottom:8px;font-family:Georgia,serif;">&ldquo;</div>
                    ${starsHtml}
                    <p style="margin:0 0 20px 0;color:${style.quoteColor || '#1e1b4b'};font-size:${style.quoteFontSize || '16px'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:${style.quoteLineHeight || '1.7'};font-style:italic;">${esc(content.quote || '')}</p>
                    <div style="font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">
                      ${avatarHtml}<span style="font-weight:bold;color:${style.nameColor || '#4c1d95'};font-size:${style.nameFontSize || '14px'};">${esc(content.name || '')}</span><br /><span style="color:${style.roleColor || '#7c3aed'};font-size:${style.roleFontSize || '12px'};">${esc(content.role || '')}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
}

function renderStats(content, style) {
  const items = content.items || []
  const colWidth = items.length > 0 ? Math.floor(100 / items.length) : 33
  const cellsHtml = items.map((item) => `
              <td width="${colWidth}%" align="center" valign="top" style="width:${colWidth}%;padding:4px;">
                <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tr><td align="center" style="background:${style.itemBackground || '#312e81'};border-radius:${style.itemBorderRadius || '12px'};padding:${style.itemPadding || '20px 16px'};">
                    <div style="font-size:${style.iconSize || '28px'};margin-bottom:6px;">${item.icon || ''}</div>
                    <div style="font-size:${style.valueFontSize || '28px'};font-weight:${style.valueFontWeight || 'bold'};color:${style.valueColor || '#ffffff'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:1.1;">${esc(item.value || '')}</div>
                    <div style="font-size:${style.labelFontSize || '12px'};color:${style.labelColor || '#a5b4fc'};margin-top:6px;font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:1.3;">${esc(item.label || '')}</div>
                  </td></tr>
                </table>
              </td>`).join('')
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>${cellsHtml}</tr>
              </table>
            </td>
          </tr>`
}

function renderPricing(content, style) {
  const features = content.features || []
  const badgeHtml = content.badge
    ? `<div style="margin-bottom:16px;"><span style="display:inline-block;background:${style.badgeBackground || '#f59e0b'};color:${style.badgeColor || '#1c1917'};font-size:12px;font-weight:bold;padding:4px 12px;border-radius:${style.badgeBorderRadius || '20px'};">${esc(content.badge)}</span></div>`
    : ''
  const featuresHtml = features.map((f) =>
    `<div style="display:block;margin-bottom:10px;font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};font-size:${style.featureFontSize || '14px'};color:${style.featureColor || '#e0e7ff'};"><span style="color:${style.checkColor || '#6ee7b7'};margin-right:10px;">&#10003;</span>${esc(f)}</div>`
  ).join('')
  const ctaHtml = content.ctaText
    ? `<div style="text-align:center;margin-top:28px;"><a href="${esc(content.ctaHref || '#')}" style="display:inline-block;background:${style.ctaBackground || '#6366f1'};color:${style.ctaColor || '#ffffff'};padding:${style.ctaPadding || '14px 32px'};border-radius:${style.ctaBorderRadius || '8px'};font-size:${style.ctaFontSize || '15px'};font-weight:bold;font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};text-decoration:none;">${esc(content.ctaText)}</a></div>`
    : ''
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:${style.cardBackground || '#1e1b4b'};border-radius:${style.cardBorderRadius || '16px'};padding:${style.cardPadding || '36px'};">
                    ${badgeHtml}
                    <div style="font-size:${style.planNameFontSize || '13px'};font-weight:600;color:${style.planNameColor || '#c4b5fd'};text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${esc(content.planName || '')}</div>
                    <div style="margin-bottom:12px;">
                      <span style="font-size:${style.priceFontSize || '52px'};font-weight:bold;color:${style.priceColor || '#ffffff'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:1;">${esc(content.price || '')}</span>
                      <span style="font-size:24px;font-weight:bold;color:${style.priceColor || '#ffffff'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${esc(content.currency || '€')}</span>
                      <span style="font-size:${style.periodFontSize || '16px'};color:${style.periodColor || '#a5b4fc'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${esc(content.period || '')}</span>
                    </div>
                    ${content.description ? `<p style="margin:0 0 20px 0;color:${style.descriptionColor || '#c4b5fd'};font-size:${style.descriptionFontSize || '14px'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:1.6;">${esc(content.description)}</p>` : ''}
                    <div style="height:1px;background:rgba(255,255,255,0.1);margin-bottom:20px;font-size:0;line-height:0;">&nbsp;</div>
                    ${featuresHtml}
                    ${ctaHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
}

function renderHighlight(content, style) {
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" style="background-color:${style.backgroundColor};padding:${style.padding};">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:${style.cardBackground || '#eff6ff'};border-left:${style.borderWidth || '3px'} solid ${style.borderColor || '#3b82f6'};border-radius:${style.cardBorderRadius || '10px'};padding:${style.cardPadding || '20px 24px'};">
                    <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tr>
                        ${content.icon ? `<td width="40" valign="top" style="font-size:${style.iconSize || '28px'};padding-right:14px;line-height:1;">${content.icon}</td>` : ''}
                        <td valign="top">
                          ${content.title ? `<div style="font-weight:${style.titleFontWeight || 'bold'};color:${style.titleColor || '#1e40af'};font-size:${style.titleFontSize || '16px'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};margin-bottom:6px;">${esc(content.title)}</div>` : ''}
                          <div style="color:${style.textColor || '#1d4ed8'};font-size:${style.textFontSize || '14px'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:${style.textLineHeight || '1.6'};">${esc(content.text || '')}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
}

function renderSocial(content, style) {
  const links = content.links || []
  const btnSize = parseInt(style.buttonSize || '48')
  const align = style.textAlign || 'center'
  const linksHtml = links.map((link) =>
    `<a href="${esc(link.url || '#')}" style="display:inline-block;width:${btnSize}px;height:${btnSize}px;line-height:${btnSize}px;border-radius:${style.buttonBorderRadius || '50%'};background:${link.color || '#6366f1'};font-size:${style.buttonFontSize || '22px'};text-align:center;text-decoration:none;margin:0 ${Math.round(parseInt(style.gap || '12') / 2)}px;" title="${esc(link.platform || '')}">${link.icon || ''}</a>`
  ).join('')
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" align="${align}" style="background-color:${style.backgroundColor};padding:${style.padding};text-align:${align};">
              ${content.title ? `<p style="margin:0 0 16px 0;color:${style.titleColor || '#374151'};font-size:${style.titleFontSize || '15px'};font-weight:${style.titleFontWeight || '600'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${esc(content.title)}</p>` : ''}
              ${linksHtml}
            </td>
          </tr>`
}

function renderCountdown(content, style) {
  let days = '--', hours = '--', mins = '--'
  if (content.targetDate) {
    const [y, m, d] = content.targetDate.split('-').map(Number)
    const [th, tm] = (content.targetTime || '00:00').split(':').map(Number)
    const target = new Date(y, m - 1, d, th, tm, 0)
    const now = new Date()
    const diff = Math.max(0, target - now)
    days = String(Math.floor(diff / 86400000)).padStart(2, '0')
    hours = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0')
    mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
  }
  const boxes = [
    { value: days, label: content.labelDays || 'Jours' },
    { value: hours, label: content.labelHours || 'Heures' },
    { value: mins, label: content.labelMins || 'Minutes' },
  ]
  const boxSize = parseInt(style.boxSize || '80')
  const boxesHtml = boxes.map((box, i) => `
              <!--[if mso]><td width="${boxSize + 20}" valign="top" align="center"><![endif]-->
              <div style="display:inline-block;width:${boxSize}px;text-align:center;vertical-align:top;margin:0 ${Math.round(parseInt(style.gap || '10') / 2)}px;">
                <div style="width:${boxSize}px;height:${boxSize}px;background:${style.boxBackground || '#312e81'};border-radius:${style.boxBorderRadius || '12px'};line-height:${boxSize}px;text-align:center;display:inline-block;">
                  <span style="font-size:${style.numberFontSize || '36px'};font-weight:${style.numberFontWeight || 'bold'};color:${style.numberColor || '#ffffff'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:${boxSize}px;">${box.value}</span>
                </div>
                <div style="margin-top:6px;font-size:${style.labelFontSize || '11px'};color:${style.labelColor || '#a5b4fc'};text-transform:uppercase;letter-spacing:0.5px;font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${esc(box.label)}</div>
              </div>${i < boxes.length - 1 ? `<div style="display:inline-block;vertical-align:top;padding-bottom:${boxSize * 0.2}px;"><span style="font-size:${Math.round(parseInt(style.numberFontSize || '36') * 0.9)}px;color:${style.separatorColor || '#6366f1'};font-weight:bold;font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};line-height:${boxSize}px;">:</span></div>` : ''}
              <!--[if mso]></td><![endif]-->`).join('')
  return `          <tr>
            <td bgcolor="${style.backgroundColor}" align="${style.textAlign || 'center'}" style="background-color:${style.backgroundColor};padding:${style.padding};text-align:${style.textAlign || 'center'};">
              ${content.title ? `<p style="margin:0 0 24px 0;color:${style.titleColor || '#ffffff'};font-size:${style.titleFontSize || '20px'};font-weight:${style.titleFontWeight || 'bold'};font-family:${style.fontFamily || 'Arial, Helvetica, sans-serif'};">${esc(content.title)}</p>` : ''}
              <!--[if mso]><table cellpadding="0" cellspacing="0" border="0"><tr><![endif]-->
              ${boxesHtml}
              <!--[if mso]></tr></table><![endif]-->
            </td>
          </tr>`
}
