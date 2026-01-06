import Styles from "./Comments.module.scss";
import { SectionWrapper } from "../../../../shared/SectionWrapper/SectionWrapper";
import { StarsRating } from "../../../../shared/StarsRating/StarsRating";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { AddCommentForm } from "../AddCommentForm/AddCommentForm";
import Delete from "./assets/Delete.svg?react";
import Edit from "./assets/Edit.svg?react";
import { useAppSelector } from "@/app/store/reduxTypes";
import { useState } from "react";
import { useGetCommentsQuery, useDeleteCommentMutation } from "../../api/comments.api";
import type Product from "@/app/store/ProductType";

type CommentProps = {
  category?: string;
  sku?: string;
};

type Rating = Product["rating"];

export const Comments = ({ category, sku }: CommentProps) => {
  const currentUser = useAppSelector((state) => state.auth);

  const { data, isSuccess } = useGetCommentsQuery(
    category && sku ? { category: category, SKU: sku } : skipToken,
  );

  const [commentData, setCommentData] = useState<{
    comment: string;
    rating: number;
    id: string;
  } | null>(null);

  const [deleteComment] = useDeleteCommentMutation();

  const deleteCommentHandler = async (id: string) => {
    if (!category || !data?.comments[0].id) {
      return;
    }
    try {
      await deleteComment({
        category: category,
        id: id,
      }).unwrap();
    } catch (error) {
      console.error("Error", error);
    }
  };

  //Helpers
  const dateConvert = (date: string) => {
    const gettedDate = new Date(date);
    return gettedDate.toLocaleDateString();
  };

  const ratingQuantity = (step: number, rating: Rating) => {
    const key = `rating${String(step)}Length` as keyof Rating;
    return rating[key] || 0;
  };

  return (
    <SectionWrapper title={"Отзывы"}>
      {isSuccess && (
        <div className={Styles.comentsBlock}>
          <div className={Styles.ratingGradation}>
            <div className={Styles.currentRating}>
              <StarsRating value={data.rating.average} disabled />
              <p>{Math.round(data.rating.average * 100) / 100} из 5</p>
            </div>
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className={Styles.ratingGradationItem}>
                <p>{index + 1}</p>
                <StarsRating value={index + 1} disabled />
                <p>{ratingQuantity(index + 1, data.rating)}</p>
              </div>
            ))}
          </div>
          <div className={Styles.comments}>
            <div className={Styles.commentsList}>
              {data.comments.map((comment, index) => (
                <div key={index} className={Styles.comment}>
                  <p className={Styles.userName}>{comment.user?.name || "Test User"}</p>
                  <div className={Styles.starsRating}>
                    <StarsRating value={comment.rating} disabled />
                    <p className={Styles.commentDate}>{dateConvert(comment.date)}</p>
                    {currentUser.user?.id === comment.user?.id && (
                      <div className={Styles.ComentControlButtons}>
                        <button onClick={() => void deleteCommentHandler(comment.id)}>
                          <Delete />
                        </button>
                        <button>
                          <Edit
                            onClick={() => {
                              setCommentData({
                                rating: comment.rating,
                                comment: comment.comment,
                                id: comment.id,
                              });
                            }}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className={Styles.commentText}>{comment.comment}</p>
                </div>
              ))}
            </div>
            <AddCommentForm comment={commentData} category={category} sku={sku} />
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};
