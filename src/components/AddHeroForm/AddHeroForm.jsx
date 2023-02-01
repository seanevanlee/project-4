import { set } from "mongoose";
import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

function AddHeroForm({handleAddPost}) {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null)

  function handleChange(e){
	setCaption(e.target.value)
  }

  function handleFileInput(e){
	setPhoto(e.target.files[0])
  }

  function handleSubmit(e){
	e.preventDefault();

  const formData = new FormData()
	formData.append('caption', caption);
	formData.append('photo', photo)
	handleAddPost(formData)
  }
  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="caption"
          value={caption}
          placeholder="New Hero Name"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          type="file"
          name="photo"
          placeholder="New Hero Art"
          onChange={handleFileInput}
        />
        <Button type="submit" className="btn">
          Cool Hero!
        </Button>
      </Form>
    </Segment>
  );
}

export default AddHeroForm;