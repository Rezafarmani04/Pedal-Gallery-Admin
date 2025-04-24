import PropTypes from 'prop-types';
import Button from './Button';
import Heading from './Heading';
import ConfirmModal from './ConfirmModal';

function ConfirmDelete({ resourceName, onConfirm, onClose, disabled }) {
  return (
    <ConfirmModal
      onClose={onClose}
      actions={
        <>
          <Button
            variation="secondary"
            size="small"
            onClick={onClose}
            disabled={disabled}
          >
            لغو
          </Button>
          <Button
            variation="danger"
            size="small"
            onClick={onConfirm}
            disabled={disabled}
          >
            حذف
          </Button>
        </>
      }
    >
      <Heading as="h3">حذف {resourceName}</Heading>
      <p>آیا از حذف {resourceName} مطمئن هستید؟ این عمل غیرقابل بازگشت است.</p>
    </ConfirmModal>
  );
}

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ConfirmDelete;
