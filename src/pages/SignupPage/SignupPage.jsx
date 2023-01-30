import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from "react-router-dom";
import userService from "../../utils/userService";

function SignUpPage({handleSignUpOrLogin}) {
    const [state, setState] = useState({
      username: "",
      email: "",
      password: "",
      passwordConf: "",
      favorite: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate()

    async function handleSubmit(e) {
      e.preventDefault();
      for (let key in state) {
        formData.append(key, state[key]);
      }
      console.log(formData.forEach((item) => console.log(item)));

	try {
		
		await userService.signup(formData);
        handleSignUpOrLogin();
        navigate('/')

	} catch(err){
		console.log(err.message, ' this is the error in signup')
		setError('Check your terminal, there was an error signing up')
	}




  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          <Image style = {{ width: 500, height: 500 }} src="https://i.imgur.com/NK6Ofjs.jpg" /> <br/> Sign Up!
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              name="favorite"
              type="favorite"
              value={state.favorite}
              placeholder="Who's your favorite hero?"
              onChange={handleChange}
            />
            <Button type="submit" className="btn">
              Create Account
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpPage;