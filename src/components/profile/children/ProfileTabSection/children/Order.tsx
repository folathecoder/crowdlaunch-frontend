import React, { useContext } from 'react';
import moment from 'moment';
import {
  ProfileContext,
  ProfileReturnTypes,
} from '@/components/profile/context/ProfileContext';
import {
  OrderSection,
  OrderTable,
} from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';
import useGetProjectById from '@/hooks/RequestHooks/GET/useGetProjectById';

interface ProjectOrderType {
  projectId: string;
  amountInvested: number;
  createdAt: string;
}

interface NftOrderType {
  projectId: string;
  amountInvested: number;
  createdAt: string;
}
const Order = () => {
  const { user } = useContext(ProfileContext) as ProfileReturnTypes;
  const { portfolios, ownedNfts } = user || {};

  return (
    <OrderSection>
      <div>
        <h3>Project Orders</h3>
        <OrderTable>
          <tr>
            <th>Project</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
          {portfolios && portfolios?.length > 0 ? (
            <>
              {portfolios?.reverse().map((project) => (
                <ProjectOrder
                  key={project.projectId}
                  projectId={project.projectId}
                  amountInvested={project.amountInvested}
                  createdAt={project.createdAt}
                />
              ))}
            </>
          ) : (
            <tr>
              <td>No project orders</td>
            </tr>
          )}
        </OrderTable>
      </div>
      <div>
        <h3>NFT Orders</h3>
        <OrderTable>
          <tr>
            <th>NFT Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
          {ownedNfts && ownedNfts.length > 0 ? (
            <>
              {ownedNfts?.map((nft) => (
                <tr key={nft.nftId}>
                  <td>#233 JobCrob</td>
                  <td>0.23 ETH</td>
                  <td>{moment(nft.createdAt).format('DD MMM, YYYY')}</td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td>No NFT orders</td>
            </tr>
          )}
        </OrderTable>
      </div>
    </OrderSection>
  );
};

const ProjectOrder = ({
  projectId,
  amountInvested,
  createdAt,
}: ProjectOrderType) => {
  const { project } = useGetProjectById({ projectId });

  return (
    <tr>
      <td>{project?.project.projectName}</td>
      <td>{amountInvested.toLocaleString()}</td>
      <td>{moment(createdAt).format('DD MMM, YYYY')}</td>
    </tr>
  );
};

// const NFTOrder = ({}: NftOrderType) => {
//   return (
//     <tr>
//       <td>#233 JobCrob</td>
//       <td>0.23 ETH</td>
//       <td>{moment(nft.createdAt).format('DD MMM, YYYY')}</td>
//     </tr>
//   );
// };

export default Order;
