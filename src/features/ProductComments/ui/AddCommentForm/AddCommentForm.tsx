import { Button, StarsRating } from "@/shared";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Styles from "./AddCommentForm.module.scss";
import { useEffect } from "react";
import { useAddCommentMutation, useEditcommentMutation } from "../../api/comments.api";

type Comment = {
  rating: number;
  comment: string;
  id: string;
};

type AddCommentFormProps = {
  category?: string;
  sku?: string;
  comment: Comment | null;
};

export const AddCommentForm = ({ category, sku, comment }: AddCommentFormProps) => {
  const [postComment] = useAddCommentMutation();
  const [editComment] = useEditcommentMutation();

  const { register, control, handleSubmit, reset, setValue } = useForm<Comment>();

  useEffect(() => {
    if (comment) {
      for (const key in comment) {
        setValue(key as keyof Comment, comment[key as keyof Comment]);
      }
    }
  }, [comment, setValue]);

  const postCommentHandler: SubmitHandler<Comment> = async (data) => {
    if (!category || !sku) {
      return;
    }
    try {
      if (comment) {
        await editComment({
          category: category,
          id: comment.id,
          commentData: data,
        }).unwrap();
      } else {
        await postComment({
          category: category,
          SKU: sku,
          commentData: data,
        }).unwrap();
      }
      reset();
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <form onSubmit={(event) => void handleSubmit(postCommentHandler)(event)}>
      <div>
        <div className={Styles.settedRating}>
          <p>Ваша оценка</p>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => <StarsRating value={field.value} onChange={field.onChange} />}
          />
        </div>
        <div className={Styles.commentInput}>
          <textarea {...register("comment")}></textarea>
        </div>
        <div className={Styles.buttons}>
          <Button type="submit">Отправить отзыв</Button>
          {comment && (
            <Button
              type="button"
              onClick={() => {
                reset();
              }}
            >
              Отмена
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
