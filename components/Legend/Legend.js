import styled from "styled-components";

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LegendBullet = styled.div`
  background-color: ${(props) => (props.color ? props.color : "#000")};
  height: 20px;
  width: 20px;
  border-radius: 5px;
  margin-right: 5px;
`;

export const Legend = (props) => {
  const { color, title, style } = props;
  return (
    <LegendContainer style={style}>
      <LegendBullet color={color} />
      {title}
    </LegendContainer>
  );
};
