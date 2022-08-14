import { Select as AntSelect } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { theme } from "../../constants";

const SelectInput = styled(AntSelect)`
  width: 200px;
  .ant-select-selector {
    border-radius: 12px !important;
    border: 2px solid
      ${(props) => (props.disabled ? "#dfdfdf" : theme.colors.lime400)} !important;
    box-shadow: none !important;
    padding: 4px 10px !important;
    height: unset !important;
  }
  .ant-select-selection-search-input {
    height: 100% !important;
  }
`;

const GlobalStyle = createGlobalStyle`
  .ant-select-dropdown {
    border-radius: 0 0 12px 12px !important;
    box-shadow: 0 3px 14px #0002 !important;
  }
  .ant-select-open .ant-select-selector{
    border-radius: 12px 12px 0 0 !important;
  }
  .ant-select-item-option-selected{
    background: ${theme.colors.lime600} !important;
    color: ${theme.colors.white} !important;
  }
  .ant-select-arrow{
    color: ${theme.colors.lime400} !important;
  }
`;

export const Select = (props) => {
  const [isSSR, setISSR] = useState(true);
  useEffect(() => {
    setISSR(false);
  }, []);
  const {
    options,
    placeholder,
    onChange,
    defaultValue,
    disabled = false,
    style,
  } = props;
  const { Option } = AntSelect;
  return (
    !isSSR && (
      <>
        <GlobalStyle />
        <SelectInput
          showSearch
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={onChange}
          onSearch={() => {}}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          defaultValue={defaultValue ? defaultValue : undefined}
          disabled={disabled}
          style={style}
        >
          {options.map((option, index) => {
            return (
              <Option key={index} value={option.val}>
                {option.label}
              </Option>
            );
          })}
        </SelectInput>
      </>
    )
  );
};
