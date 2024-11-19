const { ArrayInput, TextInput, SimpleFormIterator, SelectInput, DateInput } = require("react-admin")

const ChildrenSection = (type) => {
    return (
        <>
        {type.type === "children" && (
            <ArrayInput
                source="children"
                fullWidth
                sx={{gridColumn: "span 2"}}
            >
                <SimpleFormIterator inline disableReordering>
                    <TextInput 
                        source="firstName"
                        label="First Name"
                        helperText={false}
                        required
                    />
                    <TextInput 
                        source="lastName"
                        label="Last Name"
                        helperText={false}
                        required
                    />
                    <SelectInput
                        source="gender"
                        label="Gender"
                        choices={[
                            { id: 'MALE', name: 'Male' , label: 'Male' },
                            { id: 'FEMALE', name: 'Female' , label: 'Female' },
                            { id: 'NON_BINARY', name: 'Non Binary', label: 'Non Binary' }
                        ]}
                        helperText={false}
                        required={true}
                    />
                    <DateInput source="birthDate" label="Birth date" parse={val => {
                      //Workaround to fix issue with dates when using negative time zones like ARG
                      if(val){
                      const date = new Date(val);
                      return date.toISOString().split('T')[0]; 
                      }
                    }}/>
                </SimpleFormIterator>
            </ArrayInput>
        )}
        </>
    )
}

export default ChildrenSection;