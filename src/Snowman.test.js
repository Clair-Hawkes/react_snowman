import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Snowman from './Snowman';
import img0 from "./0.png";
import img3 from "./3.png";
import img6 from "./6.png";

it('renders without crashing', function () {
  render(<Snowman />);
});

it("matches snapshot", function () {
  const { container } = render(<Snowman/>);
  expect(container).toMatchSnapshot();
});

//******************************** FINAL GALLOWS IMAGE  *********/
it('displays the final gallows image after guessing the max number of times', function () {

  const { container } = render(
    <Snowman words={['cat']} maxWrong={3} images={[img0, img3, img6]}
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="0"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="1"]')
  ).not.toBeInTheDocument();

  // Make a wrong guess on 'b'
  const letterB = container.querySelector('button[value="b"]');
  fireEvent.click(letterB);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="0"]')
  ).not.toBeInTheDocument();

  // Make 2 more wrong guesses
  const letterD = container.querySelector('button[value="d"]');
  fireEvent.click(letterD);
  const letterE = container.querySelector('button[value="e"]');
  fireEvent.click(letterE);

  // expect the third image to show, but not the second
  expect(
    container.querySelector('img[alt="3"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="2"]')
  ).not.toBeInTheDocument();
});


//******************************** FINAL GALLOWS IMAGE  *********/
it('does not display the button area after guessing the max number of times and displays the You Lose msg', function () {

  const { container } = render(
    <Snowman words={['cat']} maxWrong={3} images={[img0, img3, img6]}
    />
  );
  // Make 3 wrong guess
  const letterB = container.querySelector('button[value="b"]');
  fireEvent.click(letterB);
  const letterD = container.querySelector('button[value="d"]');
  fireEvent.click(letterD);
  const letterE = container.querySelector('button[value="e"]');
  fireEvent.click(letterE);

  // expect button area to not show,
  const buttonArea =
    expect(
      container.querySelector('p[class="button-area"]')
    ).toContainHTML('You Loser');
});



