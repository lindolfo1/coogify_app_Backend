import AddIcon from '../../../public/images/AddIcon.svg';
import { useState } from 'react';

interface Props {
  title: string;
  data: any[];
}

export const LibraryRows = ({ title, data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCreatePlaylist = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full flex flex-col md:gap-4 gap-6 px-2">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[22px]">{title}</span>
          <img
            src={AddIcon}
            className="w-[20px] pb-1 cursor-pointer"
            onClick={toggleCreatePlaylist}
          />
          {isOpen /*{ && (Work In Here For Create PLaylist) }*/}
        </div>

        <a href="#" className="text-[#9E67E4] text-[15px] font-medium">
          See More
        </a>
      </div>
      <div className="w-full flex items-center overflow-x-auto overflow-y-auto md:pb-0 pb-5">
        <div className="flex items-center gap-2">
          {data.map((song: any) => {
            return (
              <div
                key={song.title}
                className="flex flex-col items-center gap-[6px] cursor-pointer"
                style={{ minWidth: '200px' }} // Adjust the minimum width of each song item
              >
                <div className=" bg-[#656262] rounded-lg p-5 bg-center bg-cover">
                  <img
                    className="w-[140px] h-[140px] rounded-xl"
                    src={song.cover}
                    alt={song.title}
                  />
                  <div className="pt-2 text-white text-[15px] font-medium whitespace-nowrap">
                    {song.title.length > 20
                      ? song.title.slice(0, 17) + '...'
                      : song.title}
                  </div>
                  <div className="pt-1 text-[#BA85FE] text-[13px]">
                    {song.genre}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
