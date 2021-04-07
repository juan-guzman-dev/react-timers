import { render, fireEvent } from '@testing-library/react';
import UserForm from './UserForm';


it("renders without crashing", function () {
    render(<UserForm />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<UserForm />);
    expect(asFragment()).toMatchSnapshot();
});

it("can add a new user", function () {
    const { getByLabelText, queryByText } = render(<UserForm />);

    // no items yet
    expect(queryByText("hugo2021")).not.toBeInTheDocument();

    const nameInput = getByLabelText("Username");
    const emailInput = getByLabelText("Email");
    const submitBtn = queryByText("Create User!")

    // fill out the form
    fireEvent.change(nameInput, { target: { value: "hugo2012" } });
    fireEvent.change(emailInput, { target: { value: "hugo@email.com" } });
    fireEvent.click(submitBtn);

    // item exists!
    expect(queryByText("You are logged in as: hugo2012")).toBeInTheDocument();
});