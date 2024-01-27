import React, { useContext } from 'react';
import GiftBox from '../components/GiftBox';
import { MemberContext } from '../context/MemberContext';

const ViewOtherPage = () => {
  const { otherMembers } = useContext(MemberContext); // Every member except the member selected as self.

  return (
    <div>
      {/* Loop through otherMembers and render GiftBox for each non-selected member */}
      {otherMembers.map(nonSelectedMember => (
        <GiftBox key={nonSelectedMember.member_id} member={nonSelectedMember} />
      ))}
    </div>
  );
};

export default ViewOtherPage;
