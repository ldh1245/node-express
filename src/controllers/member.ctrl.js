import catchAsync from 'utils/catchAsync';

export const getMembers = catchAsync(async (req, res) => {
    res.send(['a', 'b']);
});
