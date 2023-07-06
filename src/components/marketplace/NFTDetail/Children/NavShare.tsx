import React from 'react';
import { DetailOption } from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { BsShare } from 'react-icons/bs';

type Props = {
  mobile?: boolean;
};

const NavShare = ({ mobile }: Props) => {
  return (
    <DetailOption mobile={mobile}>
      <div>
        <button>
          <HiArrowNarrowLeft />
        </button>
      </div>
      <div>
        <button>
          <BsShare />
        </button>
      </div>
    </DetailOption>
  );
};

export default NavShare;
