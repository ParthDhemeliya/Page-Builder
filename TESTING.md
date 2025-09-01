# Page Builder - Testing Guide

## Quick Start Testing

### 1. **Start the Application**

```bash
npm run dev
```

### 2. **Open Browser Console**

- Press **F12** or **Right-click → Inspect**
- Go to **Console** tab
- Keep it open during testing

## Test Checklist

### ✅ **Component Addition Tests**

- [ ] Click "Add Text" → Console shows component data
- [ ] Click "Add Button" → Console shows component data
- [ ] Click "Add Number Field" → Console shows component data
- [ ] Click "Add Formula Field" → Console shows component data

### ✅ **Text Editing Tests**

- [ ] Double-click Text component → Console shows "editing started"
- [ ] Type text → Console shows "typing" with current value
- [ ] Press Enter → Console shows "saved with Enter"
- [ ] Click outside → Console shows "updated"

### ✅ **Button Interaction Tests**

- [ ] Click Button → Console shows "Button clicked" + component data
- [ ] Double-click button text → Console shows "editing started"
- [ ] Edit text → Console shows "typing" updates
- [ ] Save changes → Console shows "updated"

### ✅ **Field Component Tests**

- [ ] Double-click Number Field label → Console shows "editing started"
- [ ] Type in number input → Console shows "value changed"
- [ ] Double-click Formula Field label → Console shows "editing started"
- [ ] Type in formula input → Console shows "value changed"

### ✅ **Component Management Tests**

- [ ] Click × button → Console shows "Removing component"
- [ ] Component disappears from canvas
- [ ] Add new components after removal

### ✅ **Responsive Design Tests**

- [ ] Resize browser to mobile width
- [ ] Palette buttons stack horizontally
- [ ] Sidebar moves below main content

## Expected Console Output Examples

### Adding Components

```
Adding new component: {id: "1234567890", type: "Text", ...}
```

### Text Editing

```
Text component editing started: 1
Text component typing: 1 Current value: Hello
Text component saved with Enter: 1 Text: Hello World
```

### Button Click

```
Button clicked: 2 Button text: Click Me
Button component data: {id: "2", type: "Button", ...}
```

### Field Changes

```
Number field value changed: 3 Value: 42
Formula field value changed: 4 Formula: A + B
```

## Troubleshooting

### **No Console Output?**

- Make sure Developer Tools are open
- Check Console tab is selected
- Refresh the page and try again

### **Components Not Adding?**

- Check for JavaScript errors in console
- Verify all files are saved
- Restart development server

### **Editing Not Working?**

- Double-click (not single click)
- Check for hover effects on text elements
- Verify cursor changes to text cursor

## Performance Testing

### **Add Many Components**

1. Add 10+ components of each type
2. Verify smooth scrolling
3. Check console logging performance

### **Edit Multiple Components**

1. Edit text in 5+ components
2. Verify state management
3. Check for memory leaks

## Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support

## Mobile Testing

1. **Open on mobile device**
2. **Test touch interactions**
3. **Verify responsive layout**
4. **Check console logging**

---

**Remember**: Keep the console open and watch for the expected log messages during each test!
