import { set } from "mongoose";
import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

function AddHeroForm({handleAddPost}) {
  const [hero, setHero] = useState('');
  const [upgrade, setUpgrade] = useState('');
  const [photo, setPhoto] = useState(null)

  function handleHeroChange(e){
	setHero(e.target.value)
  }

  function handleUpgradeChange(e){
	setUpgrade(e.target.value)
  }

  function handleFileInput(e){
	setPhoto(e.target.files[0])
  }

  function handleSubmit(e){
	e.preventDefault();

  const formData = new FormData()
	formData.append('hero', hero);
    formData.append('upgrade', upgrade);
	formData.append('photo', photo);
	handleAddPost(formData)
  }
  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="hero"
          value={hero}
          placeholder="New Hero Name"
          onChange={handleHeroChange}
          required
        />
         <Form.Input
          className="upgrade-control"
          name="upgrade"
          value={upgrade}
          placeholder="Aghanim's Scepter Upgrade"
          onChange={handleUpgradeChange}
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