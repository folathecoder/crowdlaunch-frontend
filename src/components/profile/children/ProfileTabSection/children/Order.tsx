import React from 'react';
import {
  OrderSection,
  OrderTable,
} from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';

const Order = () => {
  return (
    <OrderSection>
      <div>
        <h3>Project Orders</h3>
        <OrderTable>
          <tr>
            <th>Project</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item}>
              <td>Neurosynth Robotics</td>
              <td>$3,329</td>
              <td>Complete</td>
              <td>12 July, 2023</td>
            </tr>
          ))}
        </OrderTable>
      </div>
      <div>
        <h3>NFT Orders</h3>
        <OrderTable>
          <tr>
            <th>NFT Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <tr key={item}>
              <td>#233 JobCrob</td>
              <td>0.23 ETH</td>
              <td>Complete</td>
              <td>1 July, 2023</td>
            </tr>
          ))}
        </OrderTable>
      </div>
    </OrderSection>
  );
};

export default Order;
