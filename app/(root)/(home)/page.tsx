import MeetingTypeList from "@/components/MeetingTypeList";
import HomeBanner from "@/components/ui/HomeBanner";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <HomeBanner />
      <MeetingTypeList />
    </section>
  );
};

export default Home;
