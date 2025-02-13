"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";

const UploadButton = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setisOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setisOpen(true)}>
        <Button>Charger votre PDF</Button>
      </DialogTrigger>
      <DialogContent>Exemple</DialogContent>
    </Dialog>
  );
};

export default UploadButton;
