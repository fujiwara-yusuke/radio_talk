import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import styled from "styled-components"

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>ラジオのネタラジオ</title>
      </Head>
      <HeaderCustom>
        <Link href='/'>
          <a>ラジオのネタラジオ</a>
        </Link>
      </HeaderCustom>
      <MainCutom className='content'>{children}</MainCutom>
      <footer className=''></footer>
    </div>
  );
};

const HeaderCustom = styled.header`
  height: 75px;
  background: #6495ED;
  a{
    color: #FFF;
    font-size: 50px;
  }
  @media screen and (max-width: 480px) {
    a{
      font-size: 40px;
    }
  }
`

const MainCutom = styled.div`
  background: #4169E1;
`

export default Layout;
