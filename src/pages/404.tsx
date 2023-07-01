import Link from 'next/link';
import { QUERIES } from '@/styles/mediaQueries';
import styled from 'styled-components';

const Container = styled.section`
  width: min(89.61%, var(--max-container));
  margin: 0 auto;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Header = styled.h1`
  color: var(--color-font-100);
  font-size: 5rem;
  line-height: 5rem;

  @media ${QUERIES.mobileMini} {
    font-size: 9rem;
    line-height: 9rem;
  }
  @media ${QUERIES.tablet} {
    font-size: 15rem;
    line-height: 15rem;
  }
`;

const SubHeader = styled.h2`
  text-transform: uppercase;
  font-size: 1.5rem;
  margin: 1rem 0rem;
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 0.9rem;

  a {
    color: var(--color-accent-100);
    margin-left: 0.3rem;
    font-size: 0.9rem;

    &:hover {
      transition: var(--transition);
      opacity: 0.8;
    }
  }
`;

const PageNotFound = () => {
  return (
    <>
      <main>
        <Container>
          <Wrap>
            <Header>404</Header>
            <SubHeader>oops! looks like you&rsquo;re lost</SubHeader>
            <Text>
              Go back to the
              <Link href="/">homepage</Link>&nbsp; or explore our
              <Link href="/marketplace">marketplace</Link>
            </Text>
          </Wrap>
        </Container>
      </main>
    </>
  );
};

export default PageNotFound;
