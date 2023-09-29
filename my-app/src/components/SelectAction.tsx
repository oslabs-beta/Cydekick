import { FormWrapper } from './FormWrapper';

type UserData = {
  actionType: string;
  data1: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

function SelectAction({ actionType, data1, updateFields }: UserFormProps) {
  return (
    <FormWrapper title='Select Action'>
      <label>Select Action</label>
      <select
        autoFocus
        required
        value={actionType}
        onChange={e => updateFields({ actionType: e.target.value })}>
        <option value='click'>click</option>
        <option value='hover'>hover</option>
        <option value='3'>3</option>
      </select>
      <input
        type='text'
        required
        value={data1}
        onChange={e => updateFields({ data1: e.target.value })}></input>
    </FormWrapper>
  );
}
export default SelectAction;
