const SERVER_URL = "http://localhost:4000";

test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});


test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteNoteBody = await deleteNoteRes.json();
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`)
});


// New test cases
test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const GetAll0NotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const GetAll0NotesBody = await GetAll0NotesRes.json();
  expect(GetAll0NotesRes.status).toBe(200);
  expect(GetAll0NotesBody.response).toEqual([]);
});


test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  const title = "NoteTestTitle1";
  const content = "NoteTestContent1";
  let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  let postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const title2 = "NoteTestTitle2";
  const content2 = "NoteTestContent2";
  let postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });
  let postNoteBody2 = await postNoteRes2.json();
  expect(postNoteRes2.status).toBe(200);
  expect(postNoteBody2.response).toBe("Note added succesfully.");

  const GetAll2NotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const GetAll2NotesBody = await GetAll2NotesRes.json();
  expect(GetAll2NotesRes.status).toBe(200);
  expect(GetAll2NotesBody.response.length).toBe(2);

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteNoteBody = await deleteNoteRes.json();
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`2 note(s) deleted.`);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");


  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "new1",
      content: "new2",
    }),
  });
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");


  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "new only title",
    }),
  });
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
});

test("/patchNote - Patch with just content", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");


  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "only content",
    }),
  });
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe("1 note(s) deleted.");
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  for (let i = 0; i < 3; i++) {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
  }

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe("3 note(s) deleted.");

});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const updateNoteRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: "red",
    }),
  });

  const updateNoteBody = await updateNoteRes.json();
  expect(updateNoteRes.status).toBe(200);
  expect(updateNoteBody.message).toBe("Note color updated successfully.");

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe("1 note(s) deleted.");
});