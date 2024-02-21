import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ProtocolItem } from 'src/types';
import style from './style';
import icon_selected from 'src/assets/icon_selected.png';
import icon_unselected from 'src/assets/icon_unselected.png';
import { useAppSelector } from 'src/stores/hooks';
import { useLoginActions } from 'src/stores/loginSlice';

interface Props {
  protocolList: ProtocolItem[];
}

export const Protocol = (props: Props) => {
  const { protocolList } = props;

  const isSelected = useAppSelector((state) => state.login.isSelected);
  const { changeSelected } = useLoginActions();
  const handlePress = (item: ProtocolItem) => console.log(item);
  return (
    <View style={style.protocolContainer}>
      <TouchableOpacity activeOpacity={1} onPress={() => changeSelected(!isSelected)}>
        <Image style={style.selector} source={isSelected ? icon_selected : icon_unselected} />
      </TouchableOpacity>
      <Text style={style.linkButton}>
        <Text style={style.subText}>我已阅读并同意</Text>
        {protocolList.map((item, index) => (
          <Text
            style={style.linkText}
            key={`${item.text}-${index}`}
            numberOfLines={2}
            onPress={() => handlePress(item)}>
            {item.text}
          </Text>
        ))}
      </Text>
    </View>
  );
};
