import { useEffect, useState } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Spinner from '../ui/Spinner';
import { getSells } from '../services/apiSells';
import styled from 'styled-components';
import AddSell from '../features/sells/AddSell';

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1.5rem;
`;

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  width: 50%;
  max-width: 1200px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 100%;
    display: none;
  }
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.5fr 0.7fr 0.7fr 0.7fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.7fr 0.7fr 0.7fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableBody = styled.section`
  margin: 0.4rem 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileCardsContainer = styled.div`
  display: none;
  width: 100%;
  padding: 1rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MobileCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileCardLabel = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
`;

function Dashboard() {
  const [soldCars, setSoldCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSoldCars() {
      try {
        const data = await getSells();
        setSoldCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSoldCars();
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <div>خطا: {error}</div>;

  return (
    <>
      <Row style={{ flexDirection: 'column', gap: '3rem' }}>
        <Heading as="h1">فروش های شما</Heading>
      </Row>

      <TableContainer>
        <Table>
          <TableHeader>
            <div>شماره خودرو</div>
            <div>نام خودرو</div>
            <div>قیمت خودرو</div>
            <div>تاریخ فروش</div>
          </TableHeader>

          <TableBody>
            {soldCars.map((car) => (
              <TableRow key={car.id}>
                <div>{car.id}</div>
                <div>{car.name}</div>
                <div>{car.price}</div>
                <div>{new Date(car.date).toLocaleDateString('fa-IR')}</div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MobileCardsContainer>
        {soldCars.map((car) => (
          <MobileCard key={car.id}>
            <MobileCardRow>
              <MobileCardLabel>شماره خودرو:</MobileCardLabel>
              <div>{car.id}</div>
            </MobileCardRow>
            <MobileCardRow>
              <MobileCardLabel>نام خودرو:</MobileCardLabel>
              <div>{car.name}</div>
            </MobileCardRow>
            <MobileCardRow>
              <MobileCardLabel>قیمت خودرو:</MobileCardLabel>
              <div>{car.price}</div>
            </MobileCardRow>
            <MobileCardRow>
              <MobileCardLabel>تاریخ فروش:</MobileCardLabel>
              <div>{new Date(car.date).toLocaleDateString('fa-IR')}</div>
            </MobileCardRow>
          </MobileCard>
        ))}
      </MobileCardsContainer>

      <AddSell />
    </>
  );
}

export default Dashboard;
