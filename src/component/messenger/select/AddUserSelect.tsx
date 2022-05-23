import React, {Dispatch, SetStateAction, useState} from "react";
import {AppState, useAppDispatch} from "../../../index";
import {Room} from "../../../model/messenger/room/Room";
import AsyncSelect from "react-select/async";
import {connect, ConnectedProps} from "react-redux";
import {User} from "../../../model/User";

import {findUsersPerPage} from "../../../service/userService";

const AddUserSelect: React.FC<TProps> = (props) => {

    const [selectedUsers, setSelectedUsers] = useState<User[]>(null);
    const [selectedValue, setSelectedValue] = useState<User>(null);

    // const onChange = (option: User) => {
    //     if (option.type === ChatSearchOptionType.ROOM) {
    //         MessengerService.openRoom(option.payload as Room, dispatch, props.setSelectedRoom, props.rooms, props.roomMembers);
    //         setSelectedValue(null);
    //     } else {
    //         MessengerService.createPrivateRoomWith(option.payload.id)
    //             .then(createdRoom => MessengerService.openRoom(createdRoom.data, dispatch, props.setSelectedRoom, props.rooms, props.roomMembers));
    //         setSelectedValue(null);
    //     }
    // }



    return (
        <AsyncSelect loadOptions={promiseOptions(props.selectedRoom.id)}
                     getOptionLabel={s => s.title}
                     getOptionValue={s => JSON.stringify(s)}
                     maxMenuHeight={500}
                     onChange={() => {}}
                     value={selectedValue}
                     placeholder={'Search...'}
                     noOptionsMessage={({inputValue}) => inputValue ? "No results found" : ""}
        />
    );
}

function promiseOptions (roomId: number) {
    return (inputValue: string): Promise<User[]> => {
        return findUsersPerPage(0, 20, {notInRoom: roomId}).then(s => s.data.content)
    }
}

const mapStateToProps = (state: AppState) => ({
    selectedRoom: state.messenger.selectedRoom,
})

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(AddUserSelect);