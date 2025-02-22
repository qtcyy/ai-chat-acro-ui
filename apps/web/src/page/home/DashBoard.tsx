import { Divider } from "@arco-design/web-react";
import styled from "styled-components";
import {
  CommentIcon,
  ContentIcon,
  GrowthIcon,
  OnlineDataIcon,
} from "../../assets/home/Icons";
import {
  IconBook,
  IconCaretUp,
  IconFile,
  IconFire,
  IconSettings,
  IconStorage,
} from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardWrapper = styled.div`
  background: #fff;
  border-radius: 6px;
  padding: 24px;
`;

const IconWrapper = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  height: 54px;
  width: 54px;
  margin-right: 25px;
  justify-content: center;
  align-items: center;
`;

// const Divider = styled.div``;

const DashBoard = () => {
  const route = useNavigate();

  return (
    <ContentWrapper>
      <div className="flex flex-row gap-[20px]">
        <div className="flex-[0.75]">
          <CardWrapper className="flex-[0.75] flex flex-col">
            <div className="text-2xl">Welcome Back, Qtcyy</div>
            <Divider />
            <div className="flex flex-row gap-4">
              <div className="flex-1 flex flex-row justify-center items-center">
                <IconWrapper>
                  <OnlineDataIcon />
                </IconWrapper>
                <div className="flex flex-col">
                  <div className="text-[#1d2129]">Total online data</div>
                  <div className=" inline-flex items-end gap-2">
                    <div className="text-2xl font-bold">373.5w+</div>
                    <div className="text-[#1d2129]">pecs</div>
                  </div>
                </div>
              </div>
              <Divider type="vertical" style={{ height: "60px" }} />
              <div className="flex-1 flex flex-row justify-center items-center">
                <IconWrapper>
                  <ContentIcon />
                </IconWrapper>
                <div className="flex flex-col">
                  <div className="text-[#1d2129] text-nowrap">
                    Content in market
                  </div>
                  <div className=" inline-flex items-end gap-2">
                    <div className="text-2xl font-bold">368</div>
                    <div className="text-[#1d2129]">pecs</div>
                  </div>
                </div>
              </div>
              <Divider type="vertical" style={{ height: "60px" }} />
              <div className="flex-1 flex flex-row justify-center items-center">
                <IconWrapper>
                  <CommentIcon />
                </IconWrapper>
                <div className="flex flex-col">
                  <div className="text-[#1d2129]">Comments</div>
                  <div className=" inline-flex items-end gap-2">
                    <div className="text-2xl font-bold">8874</div>
                    <div className="text-[#1d2129]">pecs</div>
                  </div>
                </div>
              </div>
              <Divider type="vertical" style={{ height: "60px" }} />
              <div className="flex-1 flex flex-row justify-center items-center">
                <IconWrapper>
                  <GrowthIcon />
                </IconWrapper>
                <div className="flex flex-col">
                  <div className="text-[#1d2129]">Growth</div>
                  <div className=" inline-flex items-center gap-2">
                    <div className="text-2xl font-bold">2.8%</div>
                    <IconCaretUp className="text-green-500 scale-150 translate-y-1" />
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </CardWrapper>
        </div>
        <div className="flex-[0.25]">
          <CardWrapper className=" flex flex-col">
            <div className="flex flex-row items-center">
              <div className="text-xl">Shortcuts</div>
              <div className="ml-auto p-2 text-base rounded-md text-blue-500 hover:bg-gray-200 transition-colors duration-100 cursor-pointer">
                See more
              </div>
            </div>
            <div className="flex flex-row justify-center mt-8">
              <div className="flex-1 flex flex-col items-center group cursor-pointer">
                <div className="py-2 px-3 bg-gray-200 rounded-md group-hover:bg-blue-100">
                  <IconFile className="scale-150 group-hover:text-blue-500" />
                </div>
                <div className="group-hover:text-blue-500">Management</div>
              </div>
              <div className="flex-1 flex flex-col items-center group cursor-pointer">
                <div className="py-2 px-3 bg-gray-200 rounded-md group-hover:bg-blue-100">
                  <IconStorage className="scale-150 group-hover:text-blue-500" />
                </div>
                <div className="group-hover:text-blue-500">Statistic</div>
              </div>
              <div className="flex-1 flex flex-col items-center group cursor-pointer">
                <div className="py-2 px-3 bg-gray-200 rounded-md group-hover:bg-blue-100">
                  <IconSettings className="scale-150 group-hover:text-blue-500" />
                </div>
                <div className="group-hover:text-blue-500">Setting</div>
              </div>
            </div>
            <div className="flex flex-row justify-center mt-8">
              <div
                className="flex-1 flex flex-col items-center group cursor-pointer"
                onClick={() => route("/")}
              >
                <div className="py-2 px-3 bg-gray-200 rounded-md group-hover:bg-blue-100">
                  <IconBook className="scale-150 group-hover:text-blue-500" />
                </div>
                <div className="group-hover:text-blue-500">Book</div>
              </div>
              <div className="flex-1 flex flex-col items-center group cursor-pointer">
                <div className="py-2 px-3 bg-gray-200 rounded-md group-hover:bg-blue-100">
                  <IconFire className="scale-150 group-hover:text-blue-500" />
                </div>
                <div className="group-hover:text-blue-500">Marketing</div>
              </div>
              <div className="flex-1" />
            </div>
          </CardWrapper>
        </div>
      </div>
    </ContentWrapper>
  );
};

export { DashBoard };
