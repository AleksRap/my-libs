// eslint-disable-next-line max-len
/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-explicit-any,react/destructuring-assignment */
import React, { FC, useCallback } from 'react';
import RSelect, {
  components as component,
  ControlProps,
  OptionProps,
  PlaceholderProps,
  MenuProps,
  IndicatorContainerProps,
} from 'react-select';
import cx from 'classnames';
import { Text, Icon } from 'components';
import {
  SelectProps,
  OptionType,
  SelectSize,
  SelectColor,
} from 'types';
import styles from './styles.module.scss';

const ROOT = document.querySelector('body');

interface Props extends SelectProps {
  size?: SelectSize
  color?: SelectColor
}

const Select: FC<Props> = ({
  name,
  options,
  value,
  placeholder = 'Select value',
  onChange = () => {},
  label = '',
  customLabel = undefined,
  error = '',
  withErrorText = true,
  disabled,
  closeMenuOnSelect,
  hideSelectedOptions,
  controlShouldRenderValue,
  isClearable = false,
  isSearchable = false,
  isMulti = false,
  customStyles = {},
  classNameSelect = '',
  classNameControl = '',
  classNameOption = '',
  classNamePlaceholder = '',
  classNameMenu = '',
  classNameIndicatorsContainer = '',
  classNameDropdownIndicator = '',
  classNameValueContainer = '',
  className,
  onMenuOpen,
  onMenuClose,
  withPortal = false,
  menuPortalTarget,
  components,
  size = 'normal',
  color = 'light',
}) => {
  const Control = useCallback((props: ControlProps<OptionType, boolean>) => (
    <component.Control
      {...props}
      className={cx(
        styles.control,
        styles[color],
        styles[size],
        props.isFocused && styles.focused,
        props.menuIsOpen && styles.open,
        error && styles.errorControl,
        classNameControl,
      )}
    />
  ), [classNameControl, error]);

  const Option = useCallback((props: OptionProps<OptionType, boolean>) => (
    <component.Option
      {...props}
      className={cx(
        styles.option,
        props.isSelected && styles.selected,
        props.isFocused && styles.focused,
        classNameOption,
      )}
    >
      <Text {...props} tag="span" color="basic" size={size} />
    </component.Option>
  ), [classNameOption]);

  const Placeholder = useCallback((props: PlaceholderProps<OptionType, boolean>) => (
    <Text
      {...props}
      className={cx(styles.placeholder, classNamePlaceholder)}
      tag="span"
      color="basic-900"
      size={size}
    />
  ), [classNamePlaceholder]);

  const Menu = useCallback((props: MenuProps<OptionType, boolean>) => (
    <component.Menu {...props} className={cx(styles.menu, classNameMenu)} />
  ), [classNameMenu]);

  const ValueContainer = useCallback((props: any) => (
    <component.ValueContainer
      {...props}
      className={cx(styles.valueContainer, classNameValueContainer)}
    />
  ), [classNameValueContainer]);

  const IndicatorsContainer = useCallback((props: IndicatorContainerProps<OptionType, boolean>) => (
    <component.IndicatorsContainer
      {...props}
      className={cx(styles.indicatorsContainer, classNameIndicatorsContainer)}
    />
  ), [classNameIndicatorsContainer]);

  const DropdownIndicator = useCallback((props: any) => (
    <Icon
      {...props}
      value="dropdown"
      className={cx(
        styles.dropdownIndicator,
        props.selectProps.menuIsOpen && styles.open,
        classNameDropdownIndicator,
      )}
    />
  ), [classNameDropdownIndicator]);

  const NoOptionsMessage = useCallback(() => (
    <Text
      className={styles.noOptionsMessage}
      align="center"
      size={size}
      color="basic"
    >
      Nothing found
    </Text>
  ), []);

  const menuPortalTargetInfo = withPortal
    ? menuPortalTarget || ROOT
    : null;

  return (
    <div className={cx(styles.selectWrap, className)}>
      {customLabel}
      {(label && !customLabel) && (
        <Text
          className={cx(
            styles.label,
            styles[size],
            disabled && styles.disabled,
          )}
          size={size === 'small' ? 'small' : 'normal'}
          tag="span"
          color="basic-900"
          weight="medium"
        >
          {label}
        </Text>
      )}

      <div className={styles.selectWithErrorWrap}>
        <RSelect
          components={{
            Option: components?.Option || Option,
            Control: components?.Control || Control,
            IndicatorSeparator: components?.IndicatorSeparator || null,
            IndicatorsContainer: components?.IndicatorsContainer || IndicatorsContainer,
            Placeholder: components?.Placeholder || Placeholder,
            Menu: components?.Menu || Menu,
            ValueContainer: components?.ValueContainer || ValueContainer,
            DropdownIndicator: components?.DropdownIndicator || DropdownIndicator,
            NoOptionsMessage,
          }}
          isDisabled={disabled}
          options={options}
          closeMenuOnSelect={closeMenuOnSelect}
          hideSelectedOptions={hideSelectedOptions}
          controlShouldRenderValue={controlShouldRenderValue}
          value={value}
          name={name}
          placeholder={placeholder}
          className={cx(
            styles.select,
            error && styles.error,
            disabled && styles.disabled,
            classNameSelect,
          )}
          onChange={onChange}
          styles={{ ...customStyles }}
          menuPortalTarget={menuPortalTargetInfo}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          isMulti={isMulti}
          isClearable={isClearable}
          isSearchable={isSearchable}
        />

        {error && withErrorText && (
          <Text
            size="small"
            color="error"
            align="right"
            className={styles.errorText}
          >
            {error}
          </Text>
        )}
      </div>

    </div>
  );
};

export default Select;
