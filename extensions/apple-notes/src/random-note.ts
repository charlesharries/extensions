import { open, closeMainWindow, LaunchProps } from "@raycast/api";
import { showFailureToast } from "@raycast/utils";

import { getNotes } from "./api/getNotes";
import { getOpenNoteURL } from "./helpers";

export default async (props: LaunchProps<{ arguments: Arguments.RandomNote }>) => {
  await closeMainWindow();

  try {
    const tags = props.arguments.tags?.trim() ? props.arguments.tags.split(/\s+/) : [];

    const notes = await getNotes(1, true, tags);

    if (!Array.isArray(notes) || notes.length === 0) {
      showFailureToast(null, {
        title: "No notes found",
        message: tags.length ? "No notes found with the specified tags" : undefined
      });
      return;
    }

    open(getOpenNoteURL(notes[0].UUID));
  } catch (error) {
    showFailureToast(error, { title: "Could not open a random note." });
  }
}
