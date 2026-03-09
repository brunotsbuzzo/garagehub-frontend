/**
 * GarageHub Design System — Ant Design Theme Configuration
 *
 * Tokens extraídos do Figma "Ant Design Open Source Community"
 * (node 21299:69211) e adaptados para a identidade GarageHub.
 *
 * Referências do Figma:
 *   - Header bg: #001529  |  Sider bg: #FFFFFF
 *   - Primary (antd): #1890FF  →  GarageHub: #3DD9A4
 *   - Text primary: rgba(0,0,0,.85)  |  Text secondary: rgba(0,0,0,.45)
 *   - Border/Divider: #F0F0F0  |  Card border: rgba(0,0,0,.06)
 *   - Font: Roboto 14px, lineHeight 22px (1.5714)
 *   - Sider shadow: 0px 2px 8px rgba(0,0,0,.15)
 *   - Sider width: 208px  |  Header height: 48px
 *   - Success: #52C41A  |  Error: #FF4D4F
 *
 * Ref: https://ant.design/docs/react/customize-theme
 */

export const themeConfig = {
  token: {
    // ── COLOR TOKENS ─────────────────────────────────────────────
    colorPrimary:          '#3DD9A4',   // GarageHub mint green
    colorSuccess:          '#52C41A',   // from Figma
    colorWarning:          '#FAAD14',
    colorError:            '#FF4D4F',   // from Figma (Dust Red/5)
    colorInfo:             '#1677FF',
    colorTextBase:         '#000000',   // antd generates rgba(0,0,0,.88) from this
    colorBgBase:           '#FFFFFF',

    // Surface / layout
    colorBgLayout:         '#F5FAF7',   // GarageHub green-tinted layout bg
    colorBgContainer:      '#FFFFFF',
    colorBgElevated:       '#FFFFFF',

    // Borders — from Figma
    colorBorder:           '#D9D9D9',   // standard input/component border
    colorBorderSecondary:  '#F0F0F0',   // dividers, card borders (from Figma)

    // ── TYPOGRAPHY — from Figma (Roboto → Inter) ─────────────────
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, " +
      "'Helvetica Neue', Arial, sans-serif",
    fontSize:              14,          // from Figma Body/regular
    fontSizeSM:            12,          // Footnote/system-monospace size
    fontSizeLG:            16,
    fontSizeXL:            20,
    fontSizeHeading1:      38,
    fontSizeHeading2:      30,          // from Figma H2/medium
    fontSizeHeading3:      24,
    fontSizeHeading4:      20,
    fontSizeHeading5:      16,
    fontWeightStrong:      600,
    lineHeight:            1.5714,      // 22/14 from Figma Body/regular
    lineHeightLG:          1.5,
    lineHeightSM:          1.6667,      // 20/12 from Figma Footnote
    lineHeightHeading1:    1.21,
    lineHeightHeading2:    1.3333,      // 40/30 from Figma H2/medium
    lineHeightHeading3:    1.3333,
    lineHeightHeading4:    1.4,
    lineHeightHeading5:    1.5,

    // ── SPACING ──────────────────────────────────────────────────
    sizeUnit:              4,
    sizeStep:              4,
    margin:                16,
    marginXXS:             4,
    marginXS:              8,
    marginSM:              12,
    marginMD:              16,
    marginLG:              24,
    marginXL:              32,
    marginXXL:             48,
    padding:               16,
    paddingXXS:            4,
    paddingXS:             8,
    paddingSM:             12,
    paddingMD:             16,
    paddingLG:             24,          // from Figma card px-[24px]
    paddingXL:             32,
    paddingXXL:            48,
    controlHeight:         32,
    controlHeightSM:       24,
    controlHeightLG:       40,          // from Figma menu item height: 40px
    controlHeightXS:       16,

    // ── BORDER RADIUS ────────────────────────────────────────────
    // Figma (antd v4) uses 2px, antd v6 uses 6px. GarageHub uses 8px.
    borderRadius:          6,
    borderRadiusLG:        8,
    borderRadiusSM:        4,
    borderRadiusXS:        2,
    borderRadiusOuter:     4,

    // ── BORDERS ──────────────────────────────────────────────────
    lineType:              'solid',
    lineWidth:             1,
    lineWidthBold:         2,

    // ── SHADOWS — from Figma ─────────────────────────────────────
    // Sider shadow: 0px 2px 8px rgba(0,0,0,0.15)
    boxShadow:
      '0 2px 8px 0 rgba(0,0,0,0.15)',
    // Elevated panels / dropdowns
    boxShadowSecondary:
      '0 6px 16px 0 rgba(0,0,0,0.08), ' +
      '0 3px 6px -4px rgba(0,0,0,0.12)',
    // Cards / subtle elevation
    boxShadowTertiary:
      '0 1px 2px 0 rgba(0,0,0,0.03), ' +
      '0 1px 6px -1px rgba(0,0,0,0.02)',

    // ── MOTION — antd standard easing curves ─────────────────────
    motionUnit:            0.1,
    motionBase:            0,
    motionDurationFast:    '0.1s',
    motionDurationMid:     '0.2s',
    motionDurationSlow:    '0.3s',
    motionEaseInOut:       'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseIn:          'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    motionEaseOut:         'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseInBack:      'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    motionEaseOutBack:     'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    motionEaseInCirc:      'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
    motionEaseOutCirc:     'cubic-bezier(0.08, 0.82, 0.17, 1)',
    motionEaseInExpo:      'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    motionEaseOutExpo:     'cubic-bezier(0.19, 1, 0.22, 1)',
  },
}
