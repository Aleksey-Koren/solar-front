import AsyncSelect from "react-select/async";
import {MessengerService} from "../../../service/messenger/MessengerService";
import React, {Dispatch, SetStateAction, useState} from "react";
import {ChatSearchOption, ChatSearchOptionType} from "../../../model/messenger/chatSearchOptiom/ChatSearchOption";
import {Room} from "../../../model/messenger/room/Room";
import {AppState, useAppDispatch} from "../../../index";
import {connect, ConnectedProps} from "react-redux";


const MessengerSelect: React.FC<TProps> = (props) => {

    const [selectValue, setSelectValue] = useState<ChatSearchOption>(null);
    const dispatch = useAppDispatch();

    const onChange = (option: ChatSearchOption) => {
        if (option.type === ChatSearchOptionType.ROOM) {
            MessengerService.openRoom(option.payload as Room, dispatch, props.setSelectedRoom, props.rooms, props.roomMembers);
            setSelectValue(null);
        } else {
            MessengerService.createPrivateRoomWith(option.payload.id)
                .then(createdRoom => MessengerService.openRoom(createdRoom.data, dispatch, props.setSelectedRoom, props.rooms, props.roomMembers));
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

interface DirectProps {
    setSelectedRoom: Dispatch<SetStateAction<Room>>
}

const mapStateToProps = (state: AppState, ownProps: DirectProps) => ({
    setSelectedRoom: ownProps.setSelectedRoom,
    rooms: state.messenger.rooms,
    roomMembers: state.messenger.roomMembers
})

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(MessengerSelect);