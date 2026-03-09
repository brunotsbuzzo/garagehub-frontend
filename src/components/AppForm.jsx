/**
 * AppForm
 *
 * Wrapper sobre o Form do Ant Design que:
 * - Aplica o layout padrão do projeto (vertical, label em negrito)
 * - Expõe a prop `variant` para alternância rápida entre estilos
 * - Re-exporta Form.Item, Form.useForm e Form.List para uso externo
 *
 * Variantes:
 *   "default"  — borda padrão do Ant Design
 *   "filled"   — campos com fundo preenchido (filled)
 *   "borderless" — sem bordas, fundo transparente
 */
import { Form } from 'antd'

const VARIANT_MAP = {
  default:    'outlined',
  filled:     'filled',
  borderless: 'borderless',
}

export function AppForm({
  variant = 'default',
  layout = 'vertical',
  labelStyle,
  children,
  ...props
}) {
  return (
    <Form
      layout={layout}
      variant={VARIANT_MAP[variant] ?? 'outlined'}
      requiredMark="optional"
      {...props}
    >
      {children}
    </Form>
  )
}

AppForm.Item     = Form.Item
AppForm.useForm  = Form.useForm
AppForm.List     = Form.List
AppForm.Provider = Form.Provider
