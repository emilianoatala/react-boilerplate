import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { storeWord } from "../redux/actions/demoActions";

const Word = styled.p`
  font-size: 30px;
  color: red;
`;

const DemoView = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeWord("Hola Mundo desde redux"));
  }, []);

  return <Word>{store.demoReducer.word || "hola mundo"}</Word>;
};

export default DemoView;
