import HeadlineContent from './components/HeadlineContent';
import BottomBanner from '@/components/common/BottomBanner';
import SpecialEventForm from '@/components/common/forms-new/forms/SpecialEventForm';

export const metadata = {
  title: "Special Event Information - Secure Cash",
  description: "Submit your special event details for once-off secure cash collection services.",
};

const Page = () =>
{
  return (
    <>
      <HeadlineContent />
      <SpecialEventForm />
      <BottomBanner />
    </>
  );
};

export default Page;