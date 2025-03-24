import React from 'react'
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface InputProps {
    type: "input" | "select" | "checkbox" | "switch" | "radio" | "textarea";
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    inputType?: "text" | "email" | "password" | "date";
    selectList?: { label: string; value: string }[];
    defaultValue?: string;
}

const RenderInput = ({ field, props }: { field: any; props: InputProps }) => {
    switch (props.type) {
        case 'input':
            return (
                <FormControl>
                    <Input type={props.inputType} placeholder={props.placeholder} {...field} />
                </FormControl>
            )

        case 'select':
            return (
                <Select onValueChange={field.onChange} value={field?.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        {
                            props.selectList?.map((i, id) => (
                                <SelectItem key={id} value={i.value}>
                                    {i.label}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            );

        case "checkbox":
            return (
                <div className="items-top flex space-x-2">
                    <Checkbox
                        id={props.name}
                        onCheckedChange={(e) => field.onChange(e === true || null)}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor={props.name}
                            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {props.label}
                        </label>
                        <p className="text-sm text-muted-foreground">{props.placeholder}</p>
                    </div>
                </div>
            );

        case "radio":
            return (
                <div className="w-full">
                    <FormLabel>{props.label}</FormLabel>
                    <RadioGroup
                        defaultValue={props.defaultValue}
                        onChange={field.onChange}
                        className="flex gap-4"
                    >
                        {props?.selectList?.map((i, id) => (
                            <div className="flex items-center w-full" key={id}>
                                <RadioGroupItem
                                    value={i.value}
                                    id={i.value}
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor={i.value}
                                    className="flex flex-1 items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:text-blue-600"
                                >
                                    {i.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            );

        case "textarea":
            return (
                <FormControl>
                    <Textarea
                        type={props.inputType}
                        placeholder={props.placeholder}
                        {...field}
                    ></Textarea>
                </FormControl>
            );
    }
}

const CustomeInput = (props: InputProps) => {
    const { name, label, control, type } = props;

    return (
        <FormField control={control} name={name} render={({ field }) => (
            <FormItem className='w-full'>
                {
                    type !== "radio" && type !== "checkbox" && (
                        <FormLabel>{label}</FormLabel>
                    )
                }

                <RenderInput field={field} props={props} />
                <FormMessage />
            </FormItem>
        )} />
    )
}

export default CustomeInput;