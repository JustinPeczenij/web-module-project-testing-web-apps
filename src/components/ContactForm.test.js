import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

const renders = () => {
    render(<ContactForm />)
}

test('renders without errors', ()=>{
    renders();
});

test('renders the contact form header', ()=> {
    renders();
    const h1 = screen.getByText(/contact form/i);
    expect(h1).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    renders();
    const firstName = screen.getByLabelText(/first Name*/i);
    userEvent.type(firstName, 'abc');
    const error = await screen.getAllByTestId('error');
    expect(error.length).toEqual(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    renders();
    const button = screen.getByTestId('button')
    userEvent.click(button);
    const error = await screen.getAllByTestId('error');
    expect(error.length).toEqual(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    renders();
    const firstName = screen.getByLabelText(/first name*/i);
    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(firstName, 'Justin');
    userEvent.type(lastName, 'Peczenij');
    const button = screen.getByTestId('button');
    userEvent.click(button);
    const error = await screen.getAllByTestId('error');
    expect(error.length).toEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    renders();
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'papa jim');
    const emailError = await screen.getByText(/email must be a valid email address/i);
    expect(emailError).toBeVisible();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    renders();
    const firstName = screen.getByLabelText(/first name*/i);
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(firstName, 'Justin');
    userEvent.type(email, 'jdoe@gmail.com');
    const button = screen.getByTestId('button');
    userEvent.click(button);
    const lastNameError = await screen.getByText(/lastname is a required field/i);
    expect(lastNameError).toBeVisible();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    renders();
    const typeFirstName = 'Justin';
    const typeLastName = 'Peczenij';
    const typeEmail = 'jdoe@gmail.com';

    const firstName = screen.getByLabelText(/first name*/i);
    const lastName = screen.getByLabelText(/last name*/i);
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(firstName, typeFirstName);
    userEvent.type(lastName, typeLastName);
    userEvent.type(email, typeEmail);
    const button = screen.getByTestId('button');
    userEvent.click(button);
    const renderedFirstName = await screen.getByTestId('firstnameDisplay');
    const renderedLastName = await screen.getByTestId('lastnameDisplay');
    const renderedEmail = await screen.getByTestId('emailDisplay');
    expect(renderedFirstName).toBeVisible();
    expect(renderedLastName).toBeVisible();
    expect(renderedEmail).toBeVisible();
});

test('renders all fields text when all fields are submitted.', async () => {
    renders();
    const typeFirstName = 'Justin';
    const typeLastName = 'Peczenij';
    const typeEmail = 'jdoe@gmail.com';
    const typeMessage = 'this is the message that I am writing';

    const firstName = screen.getByLabelText(/first name*/i);
    const lastName = screen.getByLabelText(/last name*/i);
    const email = screen.getByLabelText(/email*/i);
    const message = screen.getByLabelText(/message/i);
    userEvent.type(firstName, typeFirstName);
    userEvent.type(lastName, typeLastName);
    userEvent.type(email, typeEmail);
    userEvent.type(message, typeMessage);
    const button = screen.getByTestId('button');
    userEvent.click(button);
    const renderedFirstName = await screen.getByTestId('firstnameDisplay');
    const renderedLastName = await screen.getByTestId('lastnameDisplay');
    const renderedEmail = await screen.getByTestId('emailDisplay');
    const renderedMessage = await screen.getByTestId('messageDisplay');
    expect(renderedFirstName).toBeVisible();
    expect(renderedLastName).toBeVisible();
    expect(renderedEmail).toBeVisible();
    expect(renderedMessage).toBeVisible();

});