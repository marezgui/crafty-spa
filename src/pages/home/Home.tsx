
import { PostList } from "@/components/PostList";
import { TimelineDivider } from "@/components/TimelineDivider";
import { RootState } from "@/lib/createStore";
import { useSelector } from "react-redux";
import { HomeViewModelType, selectHomeViewModel } from "./homeViewModel";
import { ReactNode } from "react";
import { exhaustiveGuard } from "@/lib/common/utils/exhaustiveGuard";


export const Home = () => {
  const viewModel = useSelector<RootState, ReturnType<typeof selectHomeViewModel>>(
    (rootState) => selectHomeViewModel(rootState, () => new Date().toISOString())
  );

  const timelineNode: ReactNode = (() => {
    switch(viewModel.timeline.type) {
      case HomeViewModelType.LOADING_TIMELINE:
        return <p>{viewModel.timeline.info}</p>
      case HomeViewModelType.NO_TIMELINE:
        return null
      case HomeViewModelType.EMPTY_TIMELINE:
        return <p>{viewModel.timeline.info}</p>
      case HomeViewModelType.TIMELINE_WITH_MESSAGES:
        return <PostList messages={viewModel.timeline.messages} />
      default:
        exhaustiveGuard(viewModel.timeline)
      
    }
  })();

  return (
    <>
      <TimelineDivider text="For you" />
      {timelineNode}
    </>
  );
};