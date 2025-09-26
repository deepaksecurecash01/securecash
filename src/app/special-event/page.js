import React from 'react';
import HeadlineContent from './components/HeadlineContent';
import BottomBanner from '@/components/common/BottomBanner';

import SpecialEventForm from '@/components/common/forms-new/forms/SpecialEventForm';

const page = () =>
{
  return (
    <div>
      <HeadlineContent />
      <SpecialEventForm />
      <BottomBanner />
    </div>
  );
};

export default page;