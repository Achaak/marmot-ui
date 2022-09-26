import type { Dialog } from '../CustomDialog/index.js'
import { CustomDialog } from '../CustomDialog/index.js'
import { ErrorDialogContent } from './ErrorDialogContent/index.js'
import { ErrorDialogFooter } from './ErrorDialogFooter/index.js'
import { ErrorDialogHeader } from './ErrorDialogHeader/index.js'

export interface ErrorDialogProps extends Dialog {
  validateButtonLabel?: string
  onValidated?: () => void
  title?: string
  content: React.ReactNode
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  validateButtonLabel,
  title,
  onClose,
  content,
  onValidated,
  ...props
}) => {
  return (
    <CustomDialog
      onClose={onClose}
      hasCloseIcon={false}
      header={<ErrorDialogHeader title={title} />}
      content={<ErrorDialogContent content={content} />}
      footer={
        <ErrorDialogFooter
          validateButtonLabel={validateButtonLabel}
          onValidated={onValidated}
          onClose={onClose}
        />
      }
      padding={{
        container: 'no-padding',
        header: 'no-padding',
        content: 'no-padding',
        footer: 'lg',
      }}
      gap={{
        container: 'no-gap',
        content: 'md',
        footer: 'md',
        header: 'md',
      }}
      {...props}
    />
  )
}

ErrorDialog.defaultProps = {
  validateButtonLabel: 'Ok',
  title: 'Oops ! A error occurred...',
}
