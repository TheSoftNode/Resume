import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { addToHover, fadInOutWithOpacity, scaleInOut } from "../animations";
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from "react-icons/bi";
import useUser from "../hooks/useUser";
import { saveToCollection, saveToFavorite } from "../api";
import useTemplates from "../hooks/useTemplates";
import { useNavigate } from "react-router-dom";

const TemplateDesignPin = ({ data, index }) => {
  const { data: user, refetch: userRefetch } = useUser();
  const {refetch: temp_refetch } = useTemplates();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const addToCollection = async (e) => {
    e.stopPropagation();
    await saveToCollection(user, data);
    userRefetch();
  };

  const addToFavorite = async (e) => {
    e.stopPropagation();
    await saveToFavorite(user, data);
    temp_refetch();
  };

  const handleRouteNavigation = () => {
    navigate(`/resumeDetail/${data?._id}`, {replace: true})
  }

  return (
    <motion.div key={data?._id} {...scaleInOut(index)}>
      <div
        onClick={handleRouteNavigation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full h-[500px] 2xl:h-[740px] rounded-md 
        bg-gray-200 overflow-hidden relative"
      >
        <img src={data?.imageURL} className="w-full h-full object-cover" />

        <AnimatePresence>
          {isHovered && (
            <motion.div
            {...fadInOutWithOpacity}
            className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex
            flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer"
          >
            <div className="flex flex-col items-end justify-start w-full gap-8">
              <InnerBoxCard
                label={
                  user?.collections?.includes(data?._id)
                    ? "Added already"
                    : "Add To Collections"
                }
                Icon={
                  user?.collections?.includes(data?._id)
                    ? BiSolidFolderPlus
                    : BiFolderPlus
                }
                onHandle={addToCollection}
              />

              <InnerBoxCard
                label={
                  data?.favorites?.includes(user?.uid)
                    ? "Remove From Favorites"
                    : "Add To Favorites"
                }
                Icon={
                  data?.favorites?.includes(user?.uid)
                    ? BiSolidHeart
                    : BiHeart
                }
                onHandle={addToFavorite}
              />
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const InnerBoxCard = ({ label, Icon, onHandle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onHandle}
      className="w-10 h-10 rounded-md bg-gray-200 flex items-center
      justify-center hover:shadow-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className="text-txtPrimary text-base" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            {...addToHover}
            className="px-3 py-2 rounded-md bg-gray-200 absolute
          -left-44 after:w-2 after:h-2 after:bg-gray-200 after:absolute
          after:-right-1 after:top-[14px] after:rotate-45"
          >
            <p className="text-sm text-txtPrimary whitespace-nowrap">{label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default TemplateDesignPin;
