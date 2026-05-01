// Block definitions — drives both the left panel library and the right panel inspector

export const BLOCK_CATEGORIES = [
  {
    name: 'Structure',
    icon: '⊞',
    blocks: [
      {
        type: 'heading',
        label: 'Titre',
        icon: 'H1',
        description: 'Titre structurant H1, H2 ou H3',
        defaultContent: { text: 'Votre titre ici', level: 'h1' },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '24px 40px 8px',
          color: '#111827',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontWeight: 'bold',
          textAlign: 'left',
          lineHeight: '1.2',
        },
        contentSchema: [
          { key: 'level', label: 'Niveau', type: 'select', options: ['h1', 'h2', 'h3'], labels: ['H1 — Principal', 'H2 — Section', 'H3 — Sous-section'] },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'textAlign', label: 'Alignement', type: 'align' },
            ],
          },
          {
            section: 'Typographie',
            fields: [
              { key: 'color', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
              { key: 'fontWeight', label: 'Graisse', type: 'fontWeight' },
              { key: 'lineHeight', label: 'Interligne', type: 'number' },
            ],
          },
        ],
      },
      {
        type: 'header',
        label: 'Header',
        icon: 'H',
        description: 'Logo / nom de la marque',
        defaultContent: {
          logoText: 'VOTRE MARQUE',
          logoSrc: '',
        },
        defaultStyle: {
          backgroundColor: '#1e1b4b',
          padding: '24px 40px',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: '22px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontWeight: 'bold',
          letterSpacing: '2px',
        },
        contentSchema: [
          { key: 'logoText', label: 'Texte du logo', type: 'text' },
          { key: 'logoSrc', label: "URL de l'image logo", type: 'url' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'textAlign', label: 'Alignement', type: 'align' },
            ],
          },
          {
            section: 'Typographie',
            fields: [
              { key: 'color', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'fontSize', label: 'Taille', type: 'px' },
              { key: 'fontWeight', label: 'Graisse', type: 'fontWeight' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
              { key: 'letterSpacing', label: 'Espacement lettres', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'footer',
        label: 'Footer',
        icon: 'F',
        description: 'Informations légales, désabonnement',
        defaultContent: {
          text: '© 2024 Votre Entreprise. Tous droits réservés.<br />123 Rue de la Paix, 75001 Paris<br /><a href="#" target="_blank" style="color:#94a3b8;">Se désabonner</a> | <a href="#" target="_blank" style="color:#94a3b8;">Politique de confidentialité</a>',
        },
        defaultStyle: {
          backgroundColor: '#f8fafc',
          padding: '24px 40px',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '12px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          lineHeight: '1.8',
        },
        contentSchema: [{ key: 'text', label: 'Texte du footer', type: 'richtext' }],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'textAlign', label: 'Alignement', type: 'align' },
            ],
          },
          {
            section: 'Typographie',
            fields: [
              { key: 'color', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'fontSize', label: 'Taille', type: 'px' },
              { key: 'lineHeight', label: 'Interligne', type: 'number' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Contenu',
    icon: '◧',
    blocks: [
      {
        type: 'hero',
        label: 'Hero',
        icon: '★',
        description: "Bloc d'accroche principal",
        defaultContent: {
          title: 'Votre Titre Principal',
          subtitle: 'Une phrase d\'accroche qui explique votre valeur ajoutée de façon convaincante.',
          showButton: true,
          buttonText: 'Découvrir',
          buttonHref: 'https://',
          imageSrc: '',
        },
        defaultStyle: {
          backgroundColor: '#6366f1',
          padding: '56px 48px',
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'Arial, Helvetica, sans-serif',
          titleFontSize: '34px',
          titleFontWeight: 'bold',
          titleColor: '#ffffff',
          subtitleFontSize: '16px',
          subtitleColor: '#e0e7ff',
          buttonBackgroundColor: '#ffffff',
          buttonColor: '#6366f1',
          buttonPadding: '14px 32px',
          buttonBorderRadius: '6px',
          buttonFontSize: '15px',
          buttonFontWeight: 'bold',
        },
        contentSchema: [
          { key: 'imageSrc', label: 'URL image de fond', type: 'url' },
          { key: 'title', label: 'Titre', type: 'text', hint: 'Modifiable directement dans le canvas' },
          { key: 'subtitle', label: 'Sous-titre', type: 'richtext' },
          { key: 'showButton', label: 'Afficher le bouton', type: 'toggle' },
          { key: 'buttonText', label: 'Texte du bouton', type: 'text' },
          { key: 'buttonHref', label: 'URL du bouton', type: 'url' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'textAlign', label: 'Alignement', type: 'align' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Titre',
            fields: [
              { key: 'titleColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'titleFontSize', label: 'Taille', type: 'px' },
              { key: 'titleFontWeight', label: 'Graisse', type: 'fontWeight' },
            ],
          },
          {
            section: 'Sous-titre',
            fields: [
              { key: 'subtitleColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'subtitleFontSize', label: 'Taille', type: 'px' },
            ],
          },
          {
            section: 'Bouton',
            fields: [
              { key: 'buttonBackgroundColor', label: 'Fond bouton', type: 'color' },
              { key: 'buttonColor', label: 'Texte bouton', type: 'color', contrastWith: 'buttonBackgroundColor' },
              { key: 'buttonBorderRadius', label: 'Rayon bordure', type: 'px' },
              { key: 'buttonFontSize', label: 'Taille police', type: 'px' },
              { key: 'buttonPadding', label: 'Espacement bouton', type: 'spacing' },
            ],
          },
        ],
      },
      {
        type: 'text',
        label: 'Texte',
        icon: 'T',
        description: 'Paragraphe de texte',
        defaultContent: {
          text: 'Ceci est un paragraphe de texte. <strong>Cliquez pour modifier</strong> le contenu et personnaliser votre message depuis le panneau de droite.',
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '24px 40px',
          color: '#374151',
          fontSize: '15px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          lineHeight: '1.7',
          textAlign: 'left',
          fontWeight: 'normal',
        },
        contentSchema: [{ key: 'text', label: 'Contenu', type: 'richtext' }],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
            ],
          },
          {
            section: 'Typographie',
            fields: [
              { key: 'color', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'fontSize', label: 'Taille', type: 'px' },
              { key: 'fontWeight', label: 'Graisse', type: 'fontWeight' },
              { key: 'lineHeight', label: 'Interligne', type: 'number' },
              { key: 'textAlign', label: 'Alignement', type: 'align' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
        ],
      },
      {
        type: 'quote',
        label: 'Citation',
        icon: '❝',
        description: 'Citation ou mise en avant',
        defaultContent: {
          text: 'Votre citation ou information importante ici.',
          attribution: '',
        },
        defaultStyle: {
          backgroundColor: '#f5f3ff',
          padding: '20px 24px 20px 28px',
          accentColor: '#6366f1',
          color: '#1e293b',
          fontSize: '15px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          lineHeight: '1.6',
          fontStyle: 'italic',
          attributionColor: '#6b7280',
          attributionFontSize: '12px',
          borderWidth: '3px',
        },
        contentSchema: [
          { key: 'text', label: 'Texte', type: 'richtext' },
          { key: 'attribution', label: 'Attribution (optionnel)', type: 'text' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'accentColor', label: 'Couleur bordure gauche', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'borderWidth', label: 'Épaisseur bordure', type: 'px' },
            ],
          },
          {
            section: 'Texte',
            fields: [
              { key: 'color', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'fontSize', label: 'Taille', type: 'px' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
              { key: 'lineHeight', label: 'Interligne', type: 'number' },
            ],
          },
          {
            section: 'Attribution',
            fields: [
              { key: 'attributionColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'attributionFontSize', label: 'Taille', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'image',
        label: 'Image',
        icon: '⬜',
        description: 'Image avec lien optionnel',
        defaultContent: {
          src: 'https://placehold.co/600x300/e2e8f0/94a3b8?text=Image+600×300',
          alt: 'Image',
          href: '',
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '0px',
          width: '100%',
          borderRadius: '0px',
        },
        contentSchema: [
          { key: 'src', label: "URL de l'image", type: 'url' },
          { key: 'alt', label: 'Texte alternatif', type: 'text' },
          { key: 'href', label: 'Lien (optionnel)', type: 'url' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'borderRadius', label: 'Arrondi', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'button',
        label: 'Bouton',
        icon: '▶',
        description: "Appel à l'action",
        defaultContent: {
          text: 'Appel à l\'action',
          href: 'https://',
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '24px 40px',
          textAlign: 'center',
          buttonBackgroundColor: '#6366f1',
          buttonColor: '#ffffff',
          buttonPadding: '14px 36px',
          buttonBorderRadius: '6px',
          buttonFontSize: '15px',
          buttonFontWeight: 'bold',
          buttonFontFamily: 'Arial, Helvetica, sans-serif',
        },
        contentSchema: [
          { key: 'text', label: 'Texte du bouton', type: 'text' },
          { key: 'href', label: 'URL', type: 'url' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond du bloc', type: 'color' },
              { key: 'padding', label: 'Espacement du bloc', type: 'spacing' },
              { key: 'textAlign', label: 'Alignement', type: 'align' },
            ],
          },
          {
            section: 'Bouton',
            fields: [
              { key: 'buttonBackgroundColor', label: 'Fond bouton', type: 'color' },
              { key: 'buttonColor', label: 'Texte', type: 'color', contrastWith: 'buttonBackgroundColor' },
              { key: 'buttonPadding', label: 'Espacement', type: 'spacing' },
              { key: 'buttonBorderRadius', label: 'Rayon bordure', type: 'px' },
              { key: 'buttonFontSize', label: 'Taille police', type: 'px' },
              { key: 'buttonFontWeight', label: 'Graisse', type: 'fontWeight' },
              { key: 'buttonFontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
        ],
      },
      {
        type: 'columns',
        label: '2 Colonnes',
        icon: '⊟',
        description: 'Deux colonnes côte à côte',
        defaultContent: {
          left: {
            title: 'Fonctionnalité 1',
            text: 'Une courte description de cette fonctionnalité ou de cet avantage.',
          },
          right: {
            title: 'Fonctionnalité 2',
            text: 'Une courte description de cette fonctionnalité ou de cet avantage.',
          },
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '32px 40px',
          gap: '24px',
          color: '#374151',
          fontSize: '14px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          lineHeight: '1.6',
          titleFontSize: '16px',
          titleFontWeight: 'bold',
          titleColor: '#111827',
        },
        contentSchema: [
          { key: 'left.title', label: 'Titre colonne gauche', type: 'text', nested: ['left', 'title'] },
          { key: 'left.text', label: 'Texte colonne gauche', type: 'richtext', nested: ['left', 'text'] },
          { key: 'right.title', label: 'Titre colonne droite', type: 'text', nested: ['right', 'title'] },
          { key: 'right.text', label: 'Texte colonne droite', type: 'richtext', nested: ['right', 'text'] },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'gap', label: 'Espace entre colonnes', type: 'px' },
            ],
          },
          {
            section: 'Titre',
            fields: [
              { key: 'titleColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'titleFontSize', label: 'Taille', type: 'px' },
              { key: 'titleFontWeight', label: 'Graisse', type: 'fontWeight' },
            ],
          },
          {
            section: 'Texte',
            fields: [
              { key: 'color', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'fontSize', label: 'Taille', type: 'px' },
              { key: 'lineHeight', label: 'Interligne', type: 'number' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Mise en page',
    icon: '—',
    blocks: [
      {
        type: 'events',
        label: 'Agenda',
        icon: '📅',
        description: 'Liste d\'événements avec cartes',
        defaultContent: {
          sectionTitle: '🌼 Les rendez-vous du mois',
          events: [
            {
              id: 'evt-default-1',
              dateLabel: 'Lundi 5 mai — 10h',
              dateColor: '#7b3f57',
              title: '🎉 Titre de l\'événement',
              description: 'Description de l\'événement.',
              badge: '',
            },
          ],
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '24px 32px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          titleColor: '#4f6b58',
          titleFontSize: '24px',
          cardBackground: '#f7f1e6',
          cardBorderRadius: '10px',
          cardPadding: '18px',
          cardGap: '12px',
          eventTitleColor: '#3f3328',
          eventTitleFontSize: '18px',
          descriptionColor: '#5a4b3e',
          descriptionFontSize: '15px',
          badgeBackground: '#222222',
          badgeColor: '#ffffff',
          badgeBorderRadius: '20px',
        },
        contentSchema: [], // Handled by special EventsEditor in RightPanel
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Titre de section',
            fields: [
              { key: 'titleColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'titleFontSize', label: 'Taille', type: 'px' },
            ],
          },
          {
            section: 'Cartes',
            fields: [
              { key: 'cardBackground', label: 'Fond carte', type: 'color' },
              { key: 'cardBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'cardPadding', label: 'Padding', type: 'spacing' },
              { key: 'cardGap', label: 'Espacement', type: 'px' },
            ],
          },
          {
            section: 'Événements',
            fields: [
              { key: 'eventTitleColor', label: 'Couleur titre', type: 'color', contrastWith: 'cardBackground' },
              { key: 'eventTitleFontSize', label: 'Taille titre', type: 'px' },
              { key: 'descriptionColor', label: 'Couleur description', type: 'color', contrastWith: 'cardBackground' },
              { key: 'descriptionFontSize', label: 'Taille description', type: 'px' },
            ],
          },
          {
            section: 'Badge',
            fields: [
              { key: 'badgeBackground', label: 'Fond', type: 'color' },
              { key: 'badgeColor', label: 'Texte', type: 'color', contrastWith: 'badgeBackground' },
              { key: 'badgeBorderRadius', label: 'Arrondi', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'divider',
        label: 'Séparateur',
        icon: '—',
        description: 'Ligne de séparation',
        defaultContent: {},
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '8px 40px',
          borderColor: '#e2e8f0',
          borderWidth: '1px',
          borderStyle: 'solid',
        },
        contentSchema: [],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
            ],
          },
          {
            section: 'Ligne',
            fields: [
              { key: 'borderColor', label: 'Couleur', type: 'color' },
              { key: 'borderWidth', label: 'Épaisseur', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'spacer',
        label: 'Espace',
        icon: '↕',
        description: 'Espace vide',
        defaultContent: {},
        defaultStyle: {
          backgroundColor: '#ffffff',
          height: '40px',
        },
        contentSchema: [],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'height', label: 'Hauteur', type: 'px' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Informatif',
    icon: '🗂',
    blocks: [
      {
        type: 'meeting-agenda',
        label: 'Ordre du jour',
        icon: '📋',
        description: 'Programme de réunion ou d\'événement',
        defaultContent: {
          title: 'Ordre du jour',
          subtitle: 'Réunion du 5 mai 2026 — 18h30',
          items: [
            { id: 'ag1', time: '18h30', text: 'Accueil et tour de table' },
            { id: 'ag2', time: '18h45', text: 'Bilan des activités en cours' },
            { id: 'ag3', time: '19h15', text: 'Questions diverses' },
          ],
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '28px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          headerBackground: '#f0f4ff',
          headerBorderColor: '#6366f1',
          titleColor: '#1e1b4b',
          titleFontSize: '20px',
          subtitleColor: '#6b7280',
          subtitleFontSize: '13px',
          numberBackground: '#6366f1',
          numberColor: '#ffffff',
          numberSize: '22px',
          timeColor: '#6366f1',
          timeFontSize: '12px',
          itemColor: '#1f2937',
          itemFontSize: '14px',
          dividerColor: '#e5e7eb',
        },
        contentSchema: [],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'En-tête',
            fields: [
              { key: 'headerBackground', label: 'Fond', type: 'color' },
              { key: 'headerBorderColor', label: 'Couleur bordure', type: 'color' },
              { key: 'titleColor', label: 'Couleur titre', type: 'color', contrastWith: 'headerBackground' },
              { key: 'titleFontSize', label: 'Taille titre', type: 'px' },
              { key: 'subtitleColor', label: 'Couleur sous-titre', type: 'color', contrastWith: 'headerBackground' },
            ],
          },
          {
            section: 'Numérotation',
            fields: [
              { key: 'numberBackground', label: 'Fond numéro', type: 'color' },
              { key: 'numberColor', label: 'Couleur numéro', type: 'color', contrastWith: 'numberBackground' },
            ],
          },
          {
            section: 'Points',
            fields: [
              { key: 'timeColor', label: 'Couleur horaire', type: 'color' },
              { key: 'timeFontSize', label: 'Taille horaire', type: 'px' },
              { key: 'itemColor', label: 'Couleur texte', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'itemFontSize', label: 'Taille texte', type: 'px' },
              { key: 'dividerColor', label: 'Couleur séparateur', type: 'color' },
            ],
          },
        ],
      },
      {
        type: 'practical-info',
        label: 'Infos pratiques',
        icon: '📍',
        description: 'Coordonnées et informations de contact',
        defaultContent: {
          title: 'Infos pratiques',
          items: [
            { id: 'pi1', icon: '📍', label: 'Adresse', value: '12 rue des Lilas, 75012 Paris' },
            { id: 'pi2', icon: '🕐', label: 'Horaires', value: 'Mardi et vendredi — 9h à 12h' },
            { id: 'pi3', icon: '📞', label: 'Téléphone', value: '01 23 45 67 89' },
            { id: 'pi4', icon: '✉️', label: 'Email', value: 'contact@monassociation.fr' },
          ],
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '28px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          titleColor: '#1e1b4b',
          titleFontSize: '18px',
          titleFontWeight: 'bold',
          cardBackground: '#f9fafb',
          cardBorderRadius: '10px',
          cardPadding: '12px 16px',
          iconSize: '20px',
          labelColor: '#6b7280',
          labelFontSize: '11px',
          valueColor: '#111827',
          valueFontSize: '14px',
          accentColor: '#6366f1',
          gap: '8px',
        },
        contentSchema: [],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Titre',
            fields: [
              { key: 'titleColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'titleFontSize', label: 'Taille', type: 'px' },
              { key: 'titleFontWeight', label: 'Graisse', type: 'fontWeight' },
            ],
          },
          {
            section: 'Lignes',
            fields: [
              { key: 'cardBackground', label: 'Fond ligne', type: 'color' },
              { key: 'cardBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'accentColor', label: 'Couleur accent gauche', type: 'color' },
              { key: 'iconSize', label: 'Taille icône', type: 'px' },
              { key: 'gap', label: 'Espacement', type: 'px' },
            ],
          },
          {
            section: 'Texte',
            fields: [
              { key: 'labelColor', label: 'Couleur label', type: 'color', contrastWith: 'cardBackground' },
              { key: 'labelFontSize', label: 'Taille label', type: 'px' },
              { key: 'valueColor', label: 'Couleur valeur', type: 'color', contrastWith: 'cardBackground' },
              { key: 'valueFontSize', label: 'Taille valeur', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'news-items',
        label: 'Brèves',
        icon: '📰',
        description: 'Liste de courtes actualités',
        defaultContent: {
          title: 'Les brèves du mois',
          items: [
            { id: 'ni1', category: 'Activités', headline: 'Reprise des ateliers de couture', text: 'Les ateliers reprennent le 15 mai. Inscription obligatoire auprès du secrétariat.', href: '' },
            { id: 'ni2', category: 'Partenariat', headline: 'Nouveau partenariat avec la médiathèque', text: 'Accès gratuit aux ressources numériques pour tous nos adhérents.', href: '' },
          ],
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '28px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          titleColor: '#1e1b4b',
          titleFontSize: '20px',
          titleFontWeight: 'bold',
          categoryBackground: '#e0e7ff',
          categoryColor: '#3730a3',
          categoryFontSize: '10px',
          categoryBorderRadius: '4px',
          headlineColor: '#111827',
          headlineFontSize: '15px',
          textColor: '#4b5563',
          textFontSize: '13px',
          textLineHeight: '1.6',
          dividerColor: '#e5e7eb',
          linkColor: '#6366f1',
        },
        contentSchema: [],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Titre',
            fields: [
              { key: 'titleColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'titleFontSize', label: 'Taille', type: 'px' },
            ],
          },
          {
            section: 'Catégorie',
            fields: [
              { key: 'categoryBackground', label: 'Fond badge', type: 'color' },
              { key: 'categoryColor', label: 'Texte badge', type: 'color', contrastWith: 'categoryBackground' },
              { key: 'categoryBorderRadius', label: 'Arrondi', type: 'px' },
            ],
          },
          {
            section: 'Article',
            fields: [
              { key: 'headlineColor', label: 'Couleur titre', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'headlineFontSize', label: 'Taille titre', type: 'px' },
              { key: 'textColor', label: 'Couleur texte', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'textFontSize', label: 'Taille texte', type: 'px' },
              { key: 'linkColor', label: 'Couleur lien', type: 'color' },
              { key: 'dividerColor', label: 'Couleur séparateur', type: 'color' },
            ],
          },
        ],
      },
      {
        type: 'volunteer',
        label: 'Appel à bénévoles',
        icon: '🙋',
        description: 'Annonce de besoin de bénévoles',
        defaultContent: {
          title: 'Nous avons besoin de vous !',
          role: '🎨 Animateur·trice pour ateliers créatifs',
          description: 'Notre association recherche des bénévoles pour animer les ateliers du mercredi après-midi. Aucune expérience requise, seulement de la bonne volonté !',
          dates: 'Tous les mercredis — 14h à 17h',
          spots: '3 places disponibles',
          ctaLabel: 'Je suis volontaire',
          ctaHref: 'mailto:benevoles@monassociation.fr',
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '24px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          headerBackground: '#fef3c7',
          headerBorderColor: '#f59e0b',
          titleColor: '#92400e',
          titleFontSize: '20px',
          roleColor: '#1f2937',
          roleFontSize: '16px',
          roleFontWeight: 'bold',
          descriptionColor: '#374151',
          descriptionFontSize: '14px',
          descriptionLineHeight: '1.7',
          infoBackground: '#fffbeb',
          infoColor: '#92400e',
          infoFontSize: '13px',
          spotsBackground: '#22c55e',
          spotsColor: '#ffffff',
          spotsBorderRadius: '20px',
          ctaBackground: '#f59e0b',
          ctaColor: '#1c1917',
          ctaBorderRadius: '6px',
          ctaPadding: '12px 28px',
          ctaFontSize: '14px',
        },
        contentSchema: [
          { key: 'title', label: 'Titre', type: 'text' },
          { key: 'role', label: 'Rôle recherché', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'dates', label: 'Dates / Horaires', type: 'text' },
          { key: 'spots', label: 'Places disponibles', type: 'text' },
          { key: 'ctaLabel', label: 'Texte du bouton', type: 'text' },
          { key: 'ctaHref', label: 'Lien (mailto ou URL)', type: 'url' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'En-tête',
            fields: [
              { key: 'headerBackground', label: 'Fond', type: 'color' },
              { key: 'headerBorderColor', label: 'Couleur bordure', type: 'color' },
              { key: 'titleColor', label: 'Couleur titre', type: 'color', contrastWith: 'headerBackground' },
              { key: 'titleFontSize', label: 'Taille titre', type: 'px' },
            ],
          },
          {
            section: 'Corps',
            fields: [
              { key: 'roleColor', label: 'Couleur rôle', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'roleFontSize', label: 'Taille rôle', type: 'px' },
              { key: 'descriptionColor', label: 'Couleur desc.', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'descriptionFontSize', label: 'Taille desc.', type: 'px' },
            ],
          },
          {
            section: 'Infos & Places',
            fields: [
              { key: 'infoBackground', label: 'Fond infos', type: 'color' },
              { key: 'infoColor', label: 'Couleur infos', type: 'color', contrastWith: 'infoBackground' },
              { key: 'spotsBackground', label: 'Fond places', type: 'color' },
              { key: 'spotsColor', label: 'Texte places', type: 'color', contrastWith: 'spotsBackground' },
              { key: 'spotsBorderRadius', label: 'Arrondi places', type: 'px' },
            ],
          },
          {
            section: 'Bouton',
            fields: [
              { key: 'ctaBackground', label: 'Fond', type: 'color' },
              { key: 'ctaColor', label: 'Texte', type: 'color', contrastWith: 'ctaBackground' },
              { key: 'ctaBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'ctaPadding', label: 'Espacement', type: 'spacing' },
              { key: 'ctaFontSize', label: 'Taille police', type: 'px' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Créatif',
    icon: '✦',
    blocks: [
      {
        type: 'testimonial',
        label: 'Témoignage',
        icon: '💬',
        description: 'Avis client avec étoiles et auteur',
        defaultContent: {
          quote: 'Un service exceptionnel, je recommande vivement à tous mes proches !',
          name: 'Marie Dupont',
          role: 'Cliente fidèle',
          avatarSrc: '',
          stars: '5',
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '32px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          cardBackground: '#f5f3ff',
          cardBorderRadius: '14px',
          cardPadding: '28px',
          accentColor: '#7c3aed',
          quoteColor: '#1e1b4b',
          quoteFontSize: '16px',
          quoteLineHeight: '1.7',
          nameColor: '#4c1d95',
          nameFontSize: '14px',
          roleColor: '#7c3aed',
          roleFontSize: '12px',
          starColor: '#f59e0b',
          starSize: '18px',
        },
        contentSchema: [
          { key: 'quote', label: 'Citation', type: 'textarea' },
          { key: 'name', label: 'Nom', type: 'text' },
          { key: 'role', label: 'Rôle / Titre', type: 'text' },
          { key: 'avatarSrc', label: 'URL avatar', type: 'url' },
          { key: 'stars', label: 'Étoiles (1–5)', type: 'text' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Carte',
            fields: [
              { key: 'cardBackground', label: 'Fond carte', type: 'color' },
              { key: 'cardBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'cardPadding', label: 'Padding', type: 'spacing' },
              { key: 'accentColor', label: 'Couleur accent', type: 'color' },
            ],
          },
          {
            section: 'Citation',
            fields: [
              { key: 'quoteColor', label: 'Couleur', type: 'color', contrastWith: 'cardBackground' },
              { key: 'quoteFontSize', label: 'Taille', type: 'px' },
              { key: 'quoteLineHeight', label: 'Interligne', type: 'number' },
            ],
          },
          {
            section: 'Auteur',
            fields: [
              { key: 'nameColor', label: 'Couleur nom', type: 'color', contrastWith: 'cardBackground' },
              { key: 'nameFontSize', label: 'Taille nom', type: 'px' },
              { key: 'roleColor', label: 'Couleur rôle', type: 'color', contrastWith: 'cardBackground' },
              { key: 'roleFontSize', label: 'Taille rôle', type: 'px' },
            ],
          },
          {
            section: 'Étoiles',
            fields: [
              { key: 'starColor', label: 'Couleur', type: 'color' },
              { key: 'starSize', label: 'Taille', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'stats',
        label: 'Statistiques',
        icon: '📊',
        description: 'Chiffres clés en grille horizontale',
        defaultContent: {
          items: [
            { id: 's1', value: '1 200+', label: 'Clients satisfaits', icon: '👥' },
            { id: 's2', value: '98%', label: 'Taux de satisfaction', icon: '⭐' },
            { id: 's3', value: '15 ans', label: "d'expérience", icon: '🏆' },
          ],
        },
        defaultStyle: {
          backgroundColor: '#1e1b4b',
          padding: '40px 32px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          itemBackground: '#312e81',
          itemBorderRadius: '12px',
          itemPadding: '20px 16px',
          iconSize: '28px',
          valueColor: '#ffffff',
          valueFontSize: '28px',
          valueFontWeight: 'bold',
          labelColor: '#a5b4fc',
          labelFontSize: '12px',
        },
        contentSchema: [],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Cartes',
            fields: [
              { key: 'itemBackground', label: 'Fond carte', type: 'color' },
              { key: 'itemBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'itemPadding', label: 'Padding', type: 'spacing' },
              { key: 'iconSize', label: 'Taille icône', type: 'px' },
            ],
          },
          {
            section: 'Valeur',
            fields: [
              { key: 'valueColor', label: 'Couleur', type: 'color', contrastWith: 'itemBackground' },
              { key: 'valueFontSize', label: 'Taille', type: 'px' },
              { key: 'valueFontWeight', label: 'Graisse', type: 'fontWeight' },
            ],
          },
          {
            section: 'Label',
            fields: [
              { key: 'labelColor', label: 'Couleur', type: 'color', contrastWith: 'itemBackground' },
              { key: 'labelFontSize', label: 'Taille', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'pricing',
        label: 'Tarification',
        icon: '💰',
        description: 'Carte de prix avec fonctionnalités et CTA',
        defaultContent: {
          planName: 'Pack Premium',
          price: '49',
          currency: '€',
          period: '/mois',
          description: 'Tout ce dont vous avez besoin pour démarrer avec succès.',
          features: ['Accès illimité', 'Support prioritaire 24/7', 'Mises à jour incluses', 'Tableau de bord avancé'],
          ctaText: 'Commencer maintenant',
          ctaHref: '#',
          badge: 'Populaire',
        },
        defaultStyle: {
          backgroundColor: '#f8fafc',
          padding: '32px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          cardBackground: '#1e1b4b',
          cardBorderRadius: '16px',
          cardPadding: '36px',
          badgeBackground: '#f59e0b',
          badgeColor: '#1c1917',
          badgeBorderRadius: '20px',
          planNameColor: '#c4b5fd',
          planNameFontSize: '13px',
          priceColor: '#ffffff',
          priceFontSize: '52px',
          periodColor: '#a5b4fc',
          periodFontSize: '16px',
          descriptionColor: '#c4b5fd',
          descriptionFontSize: '14px',
          featureColor: '#e0e7ff',
          featureFontSize: '14px',
          checkColor: '#6ee7b7',
          ctaBackground: '#6366f1',
          ctaColor: '#ffffff',
          ctaBorderRadius: '8px',
          ctaPadding: '14px 32px',
          ctaFontSize: '15px',
        },
        contentSchema: [],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Carte',
            fields: [
              { key: 'cardBackground', label: 'Fond carte', type: 'color' },
              { key: 'cardBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'cardPadding', label: 'Padding', type: 'spacing' },
            ],
          },
          {
            section: 'Badge',
            fields: [
              { key: 'badgeBackground', label: 'Fond badge', type: 'color' },
              { key: 'badgeColor', label: 'Texte badge', type: 'color', contrastWith: 'badgeBackground' },
              { key: 'badgeBorderRadius', label: 'Arrondi', type: 'px' },
            ],
          },
          {
            section: 'Prix',
            fields: [
              { key: 'priceColor', label: 'Couleur prix', type: 'color', contrastWith: 'cardBackground' },
              { key: 'priceFontSize', label: 'Taille prix', type: 'px' },
              { key: 'periodColor', label: 'Couleur période', type: 'color', contrastWith: 'cardBackground' },
              { key: 'planNameColor', label: 'Couleur plan', type: 'color', contrastWith: 'cardBackground' },
              { key: 'descriptionColor', label: 'Couleur desc.', type: 'color', contrastWith: 'cardBackground' },
            ],
          },
          {
            section: 'Fonctionnalités',
            fields: [
              { key: 'featureColor', label: 'Couleur', type: 'color', contrastWith: 'cardBackground' },
              { key: 'checkColor', label: 'Couleur coche', type: 'color' },
            ],
          },
          {
            section: 'Bouton CTA',
            fields: [
              { key: 'ctaBackground', label: 'Fond', type: 'color' },
              { key: 'ctaColor', label: 'Texte', type: 'color', contrastWith: 'ctaBackground' },
              { key: 'ctaBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'ctaPadding', label: 'Espacement', type: 'spacing' },
              { key: 'ctaFontSize', label: 'Taille police', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'highlight',
        label: 'Encadré',
        icon: '💡',
        description: "Bloc mis en valeur avec icône et titre",
        defaultContent: {
          icon: '💡',
          title: 'Le saviez-vous ?',
          text: 'Ajoutez votre message important ici. Ce bloc est idéal pour attirer l\'attention sur une information clé.',
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '16px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          cardBackground: '#eff6ff',
          borderColor: '#3b82f6',
          borderWidth: '3px',
          cardBorderRadius: '10px',
          cardPadding: '20px 24px',
          iconSize: '28px',
          titleColor: '#1e40af',
          titleFontSize: '16px',
          titleFontWeight: 'bold',
          textColor: '#1d4ed8',
          textFontSize: '14px',
          textLineHeight: '1.6',
        },
        contentSchema: [
          { key: 'icon', label: 'Icône (emoji)', type: 'text' },
          { key: 'title', label: 'Titre', type: 'text' },
          { key: 'text', label: 'Texte', type: 'textarea' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Carte',
            fields: [
              { key: 'cardBackground', label: 'Fond', type: 'color' },
              { key: 'borderColor', label: 'Couleur bordure', type: 'color' },
              { key: 'borderWidth', label: 'Épaisseur bordure', type: 'px' },
              { key: 'cardBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'cardPadding', label: 'Padding', type: 'spacing' },
              { key: 'iconSize', label: 'Taille icône', type: 'px' },
            ],
          },
          {
            section: 'Titre',
            fields: [
              { key: 'titleColor', label: 'Couleur', type: 'color', contrastWith: 'cardBackground' },
              { key: 'titleFontSize', label: 'Taille', type: 'px' },
              { key: 'titleFontWeight', label: 'Graisse', type: 'fontWeight' },
            ],
          },
          {
            section: 'Texte',
            fields: [
              { key: 'textColor', label: 'Couleur', type: 'color', contrastWith: 'cardBackground' },
              { key: 'textFontSize', label: 'Taille', type: 'px' },
              { key: 'textLineHeight', label: 'Interligne', type: 'number' },
            ],
          },
        ],
      },
      {
        type: 'social',
        label: 'Réseaux sociaux',
        icon: '🔗',
        description: 'Boutons de réseaux sociaux colorés',
        defaultContent: {
          title: 'Suivez-nous',
          links: [
            { id: 'soc1', platform: 'Instagram', url: '#', icon: '📸', color: '#e1306c' },
            { id: 'soc2', platform: 'Facebook', url: '#', icon: '👍', color: '#1877f2' },
            { id: 'soc3', platform: 'LinkedIn', url: '#', icon: '💼', color: '#0a66c2' },
          ],
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '24px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          textAlign: 'center',
          titleColor: '#374151',
          titleFontSize: '15px',
          titleFontWeight: '600',
          buttonSize: '48px',
          buttonBorderRadius: '50%',
          buttonFontSize: '22px',
          gap: '12px',
        },
        contentSchema: [],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'textAlign', label: 'Alignement', type: 'align' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
            ],
          },
          {
            section: 'Titre',
            fields: [
              { key: 'titleColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'titleFontSize', label: 'Taille', type: 'px' },
            ],
          },
          {
            section: 'Boutons',
            fields: [
              { key: 'buttonSize', label: 'Taille', type: 'px' },
              { key: 'buttonBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'buttonFontSize', label: 'Taille icône', type: 'px' },
              { key: 'gap', label: 'Espacement', type: 'px' },
            ],
          },
        ],
      },
      {
        type: 'countdown',
        label: 'Compte à rebours',
        icon: '⏳',
        description: "Compte à rebours visuel vers un événement",
        defaultContent: {
          title: "🎉 L'événement commence dans...",
          targetDate: '',
          targetTime: '18:00',
          labelDays: 'Jours',
          labelHours: 'Heures',
          labelMins: 'Minutes',
        },
        defaultStyle: {
          backgroundColor: '#1e1b4b',
          padding: '40px 40px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          textAlign: 'center',
          titleColor: '#ffffff',
          titleFontSize: '20px',
          titleFontWeight: 'bold',
          boxBackground: '#312e81',
          boxBorderRadius: '12px',
          boxSize: '80px',
          numberColor: '#ffffff',
          numberFontSize: '36px',
          numberFontWeight: 'bold',
          labelColor: '#a5b4fc',
          labelFontSize: '11px',
          separatorColor: '#6366f1',
          gap: '10px',
        },
        contentSchema: [
          { key: 'title', label: 'Titre', type: 'text' },
          { key: 'targetDate', label: 'Date cible', type: 'date' },
          { key: 'targetTime', label: 'Heure cible', type: 'time' },
          { key: 'labelDays', label: 'Label jours', type: 'text' },
          { key: 'labelHours', label: 'Label heures', type: 'text' },
          { key: 'labelMins', label: 'Label minutes', type: 'text' },
        ],
        styleSchema: [
          {
            section: 'Bloc',
            fields: [
              { key: 'backgroundColor', label: 'Fond', type: 'color' },
              { key: 'padding', label: 'Espacement', type: 'spacing' },
              { key: 'fontFamily', label: 'Police', type: 'fontFamily' },
              { key: 'textAlign', label: 'Alignement', type: 'align' },
            ],
          },
          {
            section: 'Titre',
            fields: [
              { key: 'titleColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'titleFontSize', label: 'Taille', type: 'px' },
              { key: 'titleFontWeight', label: 'Graisse', type: 'fontWeight' },
            ],
          },
          {
            section: 'Cases',
            fields: [
              { key: 'boxBackground', label: 'Fond case', type: 'color' },
              { key: 'boxBorderRadius', label: 'Arrondi', type: 'px' },
              { key: 'boxSize', label: 'Taille case', type: 'px' },
              { key: 'gap', label: 'Espacement', type: 'px' },
            ],
          },
          {
            section: 'Chiffres',
            fields: [
              { key: 'numberColor', label: 'Couleur', type: 'color', contrastWith: 'boxBackground' },
              { key: 'numberFontSize', label: 'Taille', type: 'px' },
              { key: 'numberFontWeight', label: 'Graisse', type: 'fontWeight' },
            ],
          },
          {
            section: 'Labels',
            fields: [
              { key: 'labelColor', label: 'Couleur', type: 'color', contrastWith: 'backgroundColor' },
              { key: 'labelFontSize', label: 'Taille', type: 'px' },
            ],
          },
        ],
      },
    ],
  },
]

export const BLOCK_DEFS_MAP = {}
BLOCK_CATEGORIES.forEach((cat) => {
  cat.blocks.forEach((block) => {
    BLOCK_DEFS_MAP[block.type] = block
  })
})
