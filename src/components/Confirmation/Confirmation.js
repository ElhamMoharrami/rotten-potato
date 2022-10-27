import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const Confirmation = (props) => {
  const { openConfirm, handleCloseConfirm, deleteHandler } = props;

  return (
    <div>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            By deleting, you won't be abe to restore the deleted item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseConfirm}>
            cancle
          </Button>
          <Button onClick={deleteHandler} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirmation;
