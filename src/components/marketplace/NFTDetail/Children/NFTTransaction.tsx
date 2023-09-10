import React, { useContext, useRef } from 'react';
import Lottie from 'react-lottie';
import moment from 'moment';
import {
  NFTDetailContext,
  NFTDetailContextReturnTypes,
} from '@/contexts/NFTDetailContext';
import Image from 'next/image';
import Link from 'next/link';
import {
  DetailInfo,
  DetailOwner,
  OwnerImage,
  Owner,
} from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import { CustomSkeleton } from '@/components/global';
import useGetUsers from '@/hooks/RequestHooks/GET/useGetUsers';
import { ProfileLottie } from 'public/images';
import { convertToDecimal } from '@/helpers/formatters';

const NFTTransaction = () => {
  const { nftFetchingStatus, tokenURIData, nft } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;

  const { users } = useGetUsers();

  const animationRef = useRef<any>(null);

  const owner = users?.filter((user) => user.userId === nft?.nft.ownerId)[0];
  return (
    <>
      {nftFetchingStatus === 2 ? (
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
                            {owner?.userProfileImage ? (
                              <Image
                                src={owner?.userProfileImage ?? ''}
                                alt={owner?.userName ?? ''}
                                layout="responsive"
                                width={20}
                                height={20}
                              />
                            ) : (
                              <Lottie
                                ref={animationRef}
                                options={{
                                  loop: true,
                                  autoplay: false,
                                  animationData: ProfileLottie,
                                }}
                                width={20}
                                height={20}
                              />
                            )}
                          </OwnerImage>
                          <div>
                            <h4>Owner</h4>
                            <p>{owner?.userName ?? ''}</p>
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
              <h3>Attributes</h3>
            </div>
            <div>
              {tokenURIData?.attributes.map((attribute, index) => (
                <DetailOwner key={index}>
                  <div>
                    <div>
                      {attribute && (
                        <Owner>
                          <div>
                            <div>
                              <p>{attribute.trait_type}</p>
                            </div>
                          </div>
                        </Owner>
                      )}
                    </div>
                    <div>
                      {attribute && (
                        <p>
                          {attribute.trait_type === 'Share Price' &&
                            `${attribute.value} ETH`}
                          {attribute.trait_type === 'Total Shares' &&
                            `${attribute.value} ETH`}
                          {attribute.trait_type === 'Ownership Percentage' &&
                            `${convertToDecimal(attribute.value as string)} %`}
                          {attribute.trait_type === 'Date Issued' &&
                            moment(attribute.value).format('MMMM Do YYYY')}
                          {['Company', 'Industry', 'Share Class'].includes(
                            attribute.trait_type
                          ) && `${attribute.value as string}`}
                        </p>
                      )}
                    </div>
                  </div>
                </DetailOwner>
              ))}
            </div>
          </DetailInfo>
        </>
      ) : (
        <CustomSkeleton height={300} width="100%" marginTop={2} />
      )}
    </>
  );
};

export default NFTTransaction;
