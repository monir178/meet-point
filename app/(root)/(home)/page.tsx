import MeetingTypeList from "@/components/MeetingTypeList";
import Clock from "@/components/ui/Clock";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[350px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 2:40 PM
          </h2>
          <Clock />
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
