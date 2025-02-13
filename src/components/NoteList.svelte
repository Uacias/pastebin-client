<script>
  import { onMount } from "svelte";
  import { createNote, updateNote, deleteNote } from "../lib/api.js";

  let notes = [];
  let newNote = "";
  let editNoteId = null;
  let editNoteContent = "";

  /// TODO: fetch notes
  onMount(async () => {});

  async function addNote() {
    if (!newNote) return;
    const created = await createNote(newNote);
    notes = [...notes, created];
    newNote = "";
  }

  async function removeNote(id) {
    await deleteNote(id);
    notes = notes.filter((n) => n.id !== id);
  }

  function startEdit(note) {
    editNoteId = note.id;
    editNoteContent = note.content;
  }

  function cancelEdit() {
    editNoteId = null;
    editNoteContent = "";
  }

  async function saveEdit() {
    if (!editNoteId || !editNoteContent) return;
    const updated = await updateNote(editNoteId, editNoteContent);
    notes = notes.map((note) => (note.id === editNoteId ? updated : note));
    cancelEdit();
  }
</script>

<main>
  <h2>Lista Notatek</h2>

  <ul>
    {#each notes as note}
      <li>
        {#if editNoteId === note.id}
          <input type="text" bind:value={editNoteContent} />
          <button on:click={saveEdit}>Zapisz</button>
          <button on:click={cancelEdit}>Anuluj</button>
        {:else}
          {note.content}
          <button on:click={() => startEdit(note)}>Edytuj</button>
          <button on:click={() => removeNote(note.id)}>Usuń</button>
        {/if}
      </li>
    {/each}
  </ul>

  <input type="text" bind:value={newNote} placeholder="Dodaj notatkę..." />
  <button on:click={addNote}>Dodaj</button>
</main>
