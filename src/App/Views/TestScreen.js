import React, { Component } from 'react'

const TestScreen = (props) => {
  const c = props.c;
  return (
    <div>

    <pre>{JSON.stringify({props, c}, null, 2)}</pre>

    </div>
  );
}

export default TestScreen;