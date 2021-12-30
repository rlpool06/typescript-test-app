import React, { useContext, useState } from "react";
import { InputValueContext } from "./context/InputValueContext";
import { AppProps, User } from "./interfaces";
import DataGrid from './DataGrid';
import Component2, { Item } from "./Component2";

const defaultFormData = {
  title: "",
  body: "",
};

//Details
//Shipping
//Payment

type CheckoutStep = 'Details' | 'Shipping' | 'Payment';

export default function App({ headerText, extraText = 'default text' }: AppProps) {
  const [formData, setFormData] = useState(defaultFormData);
  const [user, setUser] = useState<User | null>(null);
  const { state, dispatch } = useContext(InputValueContext);
  const { title, body } = formData;

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('Details');

  const users = [
    { id: 1, name: 'John', age: 55 },
    { id: 2, name: "Mitchel", age: 23 },
    { id: 3, name: "Mike", age: 50 },
  ];

  const orders = [
    { id: 1, quantity: 5, amount: 75 },
    { id: 2, quantity: 10, amount: 100 },
    { id: 3, quantity: 15, amount: 150 },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    setFormData(defaultFormData);
  };

  const fetchUser = () => setUser({
    name: 'Ryan',
    age: 30,
    country: 'USA',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: 12345
    },
    admin: false
  })

  const items: Item[] = [
    {
      id: 1,
      type: 'imageItem',
      title: "A nice sunset",
      imageUrl:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    },
    {
      id: 2,
      type: 'quoteItem',
      quote:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, quam ea. Nisi nulla earum itaque, sapiente exercitationem, laudantium sunt fuga dolores repellendus, expedita dicta. Voluptates minima laboriosam odit reprehenderit magnam!",
    },
  ];

    return (
    <div>
      <h1>{headerText}</h1>
      {extraText && <p>{extraText}</p>}
      <button onClick={fetchUser}>Fetch user on click</button>
      {user &&<p>Welcome {user.name}</p>}

      <h1>Form</h1>
      <p>Create a post</p>

      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" id="title" value={title} onChange={onChange} />
        <br />
        <br />
        <label htmlFor="body">Body</label>
        <br />
        <input type="text" id="body" value={body} onChange={onChange} />
        <br />
        <br />
        <button type="submit">Upload post</button>
      </form>

      <br />
      <br />
      <p>Value: {state.inputValue}</p>
      <button onClick={() => dispatch({ type: 'SET_INPUT_VALUE_TO_100' })}>
        SET VALUE TO 100
      </button>

      <br />
      <br />

      {checkoutStep === 'Details' &&
        <>
          <h1>Details</h1>
          <button type='button' onClick={() => setCheckoutStep('Shipping')}>Next</button>
        </>
      }
      {checkoutStep === 'Shipping' &&
        <>
          <h1>Shipping</h1>
          <button type='button' onClick={() => setCheckoutStep('Payment')}>Next</button>
        </>
      }
      {checkoutStep === 'Payment' &&
        <>
          <h1>Payment</h1>
        </>
      }

      <br />
      <br />

      <DataGrid items={users} />

      <br />

      <DataGrid items={orders} />

      <br />
      <br />

      <Component2 items={items} />
    </div>
  );
}
