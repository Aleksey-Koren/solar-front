import AsyncSelect from "react-select/async";
import {MessengerService} from "../../../service/messenger/MessengerService";
import React, {useState} from "react";
import {ChatSearchOption, ChatSearchOptionType} from "../../../model/messenger/chatSearchOptiom/ChatSearchOption";
import {Room} from "../../../model/messenger/room/Room";
import {AppState, useAppDispatch} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import {openRoomActionTF, setRoomsToState} from "../../../redux/messenger/messengerActions";


const MessengerSelect: React.FC<TProps> = (props) => {

    const [selectValue, setSelectValue] = useState<ChatSearchOption>(null);
    const dispatch = useAppDispatch();

    const onChange = (option: ChatSearchOption) => {
        if (option.type === ChatSearchOptionType.ROOM) {
            dispatch(openRoomActionTF(option.payload as Room));
            setSelectValue(null);
        } else {

            MessengerService.createPrivateRoomWith(option.payload.id)
                .then(createdRoom => {
                    dispatch(setRoomsToState([...props.rooms, createdRoom.data]));
                    dispatch(openRoomActionTF(createdRoom.data))
                });
            setSelectValue(null);
        }
    }

    return (
        <AsyncSelect loadOptions={MessengerService.promiseOptions}
                     getOptionLabel={MessengerService.generateOptionLabel}
                     getOptionValue={s => s.toString()}
                     maxMenuHeight={500}
                     onChange={onChange}
                     value={selectValue}
                     placeholder={'Search...'}
                     noOptionsMessage={({inputValue}) => inputValue ? "No results found" : ""}
        />
    );
}


const mapStateToProps = (state: AppState) => ({
    rooms: state.messenger.rooms,
    roomMembers: state.messenger.roomMembers,
    selectedRoom: state.messenger.selectedRoom
})

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(MessengerSelect);