"use client";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { UpdateSchedAccordion } from "./UpdateSchedAccordion";

const NewChildUpdates = ({
  openVacUpdate,
  handleCloseVaccUpdate,
  vaccines,
  date_of_birth
  
}) => {
  return (
    <Dialog
      open={openVacUpdate}
      className="-m-4"
      onClose={handleCloseVaccUpdate}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="font-bold">
        {"Update Vaccines"}
      </DialogTitle>
      <DialogContent className="scrollbar-hidden">
        <DialogContentText id="alert-dialog-description">
          <UpdateSchedAccordion date_of_birth={date_of_birth}  vaccines={vaccines}  />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default NewChildUpdates;
