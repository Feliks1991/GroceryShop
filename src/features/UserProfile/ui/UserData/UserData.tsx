import { useAppDispatch, useAppSelector } from "@/app/store/reduxTypes";
import { FormButton, FormInput, SectionWrapper, SexChecker } from "../../../../shared";
import Styles from "./UserData.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { BaseUserSchema } from "@/app/store/zodTypesUser";
import { deleteUser, editUser } from "@/app/store/userThunk";

export const UserData = () => {
  type Update = z.infer<typeof BaseUserSchema>;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const birthday = user?.birthday ? new Date(user.birthday).toLocaleDateString("ru-RU") : "";

  const { register, reset, control, handleSubmit } = useForm<Update>({
    defaultValues: {
      sex: user?.sex,
    },
  });

  const [editState, setEditState] = useState<boolean>(false);

  const edit = () => {
    if (user) {
      reset(user);
    }
    setEditState((prev) => !prev);
  };

  const submit: SubmitHandler<Update> = async (data) => {
    await dispatch(editUser(data));
    setEditState(false);
  };

  const deleteUserData = async () => {
    await dispatch(deleteUser());
  };

  return (
    <SectionWrapper title={"Данные пользователя"}>
      <form onSubmit={(event) => void handleSubmit(submit)(event)} className={Styles.userData}>
        <div className={Styles.dataGrid}>
          <div className={Styles.field}>
            {editState ? (
              <FormInput id={"name"} type={"text"} label={"Имя"} register={register} />
            ) : (
              <>
                <p className={Styles.fieldLabel}>Имя:</p>
                <p className={Styles.fieldData}>{user?.name}</p>
              </>
            )}
          </div>
          <div className={Styles.field}>
            {editState ? (
              <SexChecker name={"sex"} control={control} />
            ) : (
              <>
                <p className={Styles.fieldLabel}>Пол:</p>
                <p className={Styles.fieldData}>{user?.sex}</p>
              </>
            )}
          </div>
          <div className={Styles.field}>
            {editState ? (
              <FormInput id={"country"} type={"text"} label={"Страна"} register={register} />
            ) : (
              <>
                <p className={Styles.fieldLabel}>Страна:</p>
                <p className={Styles.fieldData}>{user?.country}</p>
              </>
            )}
          </div>
          <div className={Styles.field}>
            {editState ? (
              <FormInput id={"email"} type={"text"} label={"Е-mail"} register={register} />
            ) : (
              <>
                <p className={Styles.fieldLabel}>Е-mail:</p>
                <p className={Styles.fieldData}>{user?.email}</p>
              </>
            )}
          </div>
          <div className={Styles.field}>
            {editState ? (
              <FormInput id={"lastname"} type={"text"} label={"Фамилия"} register={register} />
            ) : (
              <>
                <p className={Styles.fieldLabel}>Фамилия:</p>
                <p className={Styles.fieldData}>{user?.lastname}</p>
              </>
            )}
          </div>
          <div className={Styles.field}>
            {editState ? (
              <FormInput
                id={"birthday"}
                type={"date"}
                label={"День рождения"}
                register={register}
              />
            ) : (
              <>
                <p className={Styles.fieldLabel}>День рождения:</p>
                <p className={Styles.fieldData}>{birthday}</p>
              </>
            )}
          </div>
          <div className={Styles.field}>
            {editState ? (
              <FormInput id={"city"} type={"text"} label={"Город"} register={register} />
            ) : (
              <>
                <p className={Styles.fieldLabel}>Город:</p>
                <p className={Styles.fieldData}>{user?.city}</p>
              </>
            )}
          </div>
          <div className={Styles.field}>
            {editState ? (
              <FormInput id={"phone"} type={"text"} label={"Телефон"} register={register} />
            ) : (
              <>
                <p className={Styles.fieldLabel}>Телефон:</p>
                <p className={Styles.fieldData}>{user?.phone}</p>
              </>
            )}
          </div>
        </div>
        <div className={Styles.buttons}>
          <div className={Styles.buttonColoumn}>
            <button type="button" className={Styles.stateBtn} onClick={edit}>
              {editState ? "Отмена" : "Редактировать"}
            </button>
            <button type="button" onClick={void deleteUserData} className={Styles.stateBtn}>
              Удалить аккаунт
            </button>
          </div>
          {editState && (
            <div className={Styles.formBtnWrap}>
              <FormButton type="submit">Отправить</FormButton>
            </div>
          )}
        </div>
      </form>
    </SectionWrapper>
  );
};
