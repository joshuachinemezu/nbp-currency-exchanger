import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    background-color: #fafafa;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`

export const AppWrapper = styled.div`
  text-align: center;
  background-color: #fff;
  max-width: auto;
  margin: 3rem auto 0 auto;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  position: relative;
`

export const Error = styled.div`
  color: red;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
`
export const Loading = styled.div`
  text-align: center;
  padding: 1rem;
  margin-top: 10rem;
`
