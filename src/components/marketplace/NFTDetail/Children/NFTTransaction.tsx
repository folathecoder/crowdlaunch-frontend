import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DetailInfo,
  DetailOwner,
  OwnerImage,
  Owner,
} from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import image from 'public/images/nft';

const NFTTransaction = () => {
  return (
    <>
      <DetailInfo>
        <div>
          <h3>Ownership</h3>
        </div>
        <div>
          <Link href={'/'} target="_blank" rel="noreferrer">
            <DetailOwner>
              <div>
                <div>
                  <Owner>
                    <div>
                      <OwnerImage>
                        <Image
                          src={image.creator4}
                          alt={''}
                          layout="responsive"
                        />
                      </OwnerImage>
                      <div>
                        <h4>Owner</h4>
                        <p>Apollo Jordan</p>
                      </div>
                    </div>
                  </Owner>
                </div>
                <div>
                  <i className="fa-regular fa-arrow-up-right-from-square"></i>
                </div>
              </div>
            </DetailOwner>
          </Link>
        </div>
      </DetailInfo>
      <DetailInfo>
        <div>
          <h3>Transactions</h3>
        </div>
        <div>
          <Link href={'/'} target="_blank" rel="noreferrer">
            <DetailOwner>
              <div>
                <div>
                  <Owner>
                    <div>
                      <div>
                        <h4>12 days ago</h4>
                        <p>Bought by Apollo Jordan for $23.89</p>
                      </div>
                    </div>
                  </Owner>
                </div>
                <div>
                  <h5>View Details</h5>
                </div>
              </div>
            </DetailOwner>
          </Link>
          <Link href={'/'} target="_blank" rel="noreferrer">
            <DetailOwner>
              <div>
                <div>
                  <Owner>
                    <div>
                      <div>
                        <h4>42 days ago</h4>
                        <p>Minted by Ghost Rider</p>
                      </div>
                    </div>
                  </Owner>
                </div>
                <div>
                  <h5>View Details</h5>
                </div>
              </div>
            </DetailOwner>
          </Link>
        </div>
      </DetailInfo>
    </>
  );
};

export default NFTTransaction;
